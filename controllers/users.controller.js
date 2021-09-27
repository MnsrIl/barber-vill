const {Barber} = require("../models/Barber.model");
const {Client} = require("../models/Client.model");
const {User} = require("../models/User.model");
const {sign, verify} = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {extname} = require("path");
const fs = require("fs");

const { SECRET_KEY, HASH_SALT } = process.env;

const generateNewToken = (payload) =>
    sign(payload, SECRET_KEY, { expiresIn: "72h" });


module.exports.usersController = {

    login: async (req, res) => {
        try {
            const {login, password} = req.body;
            if (!login || !password) {
                return res.status(400).json({error: "Поля ввода не могут быть пустыми!"});
            }

            const user = await User.findOne({login}).populate("personal");
            if (!user) {
                return res.status(404).json({error: "Пользователь с таким логином не найден!"});
            }


            const isPasswordValid = bcrypt.compareSync(password, user.password);
            if (!isPasswordValid) {
                return res.status(404).json({error: "Введён неверный пароль!"});
            }

            const userObject = user.toObject(); //Иначе выдаёт кривой объект

            const token = `Bearer ${generateNewToken({...userObject, password: undefined })}`;

            const jsonOptions = {success: "Вход был успешно выполнен!", token};
            return res.status(200).json(jsonOptions);
        } catch (e) {
            return res.status(404).json({error: "Ошибка при авторизации...  " + e});
        }
    },

    signup: async (req,res) => {
        try {
            //console.log("Этап 1");
            const { name, login, password, role } = req.body;

            if (!name)
                return res.status(404).json({error: "Необходимо указать имя!"});
            else if (!login)
                return res.status(404).json({error: "Необходимо указать логин!"});
            else if (!password)
                return res.status(404).json({error: "Необходимо указать пароль"});

            //console.log("Этап 2");
            const candidate = await User.findOne({ login });
            if (candidate) {
                return res.status(400).json({error: "Пользователь с таким логином уже существует!"});
            }
            //console.log("Этап 3");

            const hashedPassword = bcrypt.hashSync(password, Number(HASH_SALT));
            //console.log("Пре-этап");

            let user;

            if (role === "Client") { //если пользователь регистрируется как клиент, то...
                //console.log("Этап 4");
                const {number} = req.body;
                if (!number) {
                    return res.status(400).json({error: "Необходимо указать номер телефона!"});
                }

                const candidateByNumber = await Client.findOne({number});
                if (candidateByNumber) {
                    return res.status(400).json({error: "Пользователь с таким номером телефона уже существует!"});
                }

                const client = await Client.create({number});
                user = await User.create({name, login, password: hashedPassword, role, personal: client.id});
                //console.log("Этап 5");
            }

            else if (role === "Barber") { //Если пользователь регистрируется как парикмахер, то...
                //console.log("Этап 6");

                const {lastname, email, telegram} = req.body;
                const avatar = req.files?.avatar;

                if (!email) {
                    return res.status(404).json({error: "Необходимо указать почту!"});
                }

                //Проверка на возможность ранее зарегистрированного пользователя с такой же почтой
                const candidateByEmail = await Barber.findOne({email});
                if (candidateByEmail) {
                    return res.status(404).json({error: "Пользователь с такой почтой уже существует!"});
                }

                //Сохранение аватарки пользователя
                let filePath = '' //Сюда в будущем мы запишем путь к нашему файлу в Базе Данных
                if (avatar) {
                    const ext = extname(avatar.name);

                    if(!((/^.(png|jpe?g|svg)$/i).test(ext))) //Проверка на нужный нам формат
                        return res.status(400).json({error: "Формат файла вашей аватарки не поддерживается!"});

                    filePath = "/assets/images/avatars/" + Math.random() + ext;
                }

                const barber = await Barber.create({lastname, avatar: filePath, email, telegram });
                user = await User.create({name, login, password: hashedPassword, role, personal: barber.id});

                //Ниже всех, чтобы сохранять фотографию только тогда, когда пользователь успешно зарегистрирован
                avatar && await avatar.mv(`./client/public${filePath}`);
                //console.log("Этап 7");
            }

            const token = `Bearer ${generateNewToken({...user.toObject(), password: undefined })}`;

            res.status(200).json({success: "Пользователь успешно создан", token});
        } catch (e) {
            res.status(404).json({error: e});
        }
    },

    logout: async (req, res) => {
       try {

       } catch {

       }
    },

    getAuthorizedUser: async (req, res) => {
        try {
            const { _id } = req.user;
            const user = await User.findById(_id, "-password").populate("personal");

            res.status(200).json({success: "Пользователь успешно найден", user });
        } catch (e) {
            res.status(400).json({error: e});
        }
    },

    getBarbers: async (req, res) => {
        try {
            const barbers = await User.find({role: "Barber"}).populate("personal");

            res.status(200).json({success: "Барберы успешно загружены", barbers});
        } catch (e) {
            res.status(400).json({error: e});
        }
    },

    removeUser: async (req, res) => {
        try {
            const {role, id, personal} = req.user;

            await [role].findByIdAndRemove(personal._id);
            await User.findByIdAndRemove(id);

            res.status(200).json({success: "Пользователь успешно удалён"});
        } catch (e) {
            res.status(400).json({error: e});
        }
    },

    updateImage: async (req, res) => {
        try {
            const {personal, role} = req.user;
            const avatar = req.files?.avatar;

            if (role !== "Barber") {
                res.status(400).json({error: "You have to be a barber!"});
            }

            let filePath = "";

            const barber = await Barber.findById(personal._id);

            if (avatar) {
                const ext = extname(avatar.name);

                if(!((/^.(png|jpe?g|svg)$/i).test(ext))) { //Проверка на нужный нам формат
                    return res.status(400).json({error: "Формат файла вашей аватарки не поддерживается!"});
                }

                filePath = "/assets/images/avatars/" + Math.random() + ext;
            }
            if (barber.avatar) {
                fs.unlinkSync(`./client/public${barber.avatar}`);
            }

            await Barber.findByIdAndUpdate(personal._id, {avatar: filePath});

            avatar && await avatar.mv(`./client/public${filePath}`);
            res.status(200).json({success: "Фотография была успешно изменена!", path: filePath });
        } catch (e) {
            res.status(400).json({error: e});
        }
    }
}