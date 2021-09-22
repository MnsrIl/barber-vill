const {Barber} = require("../models/Barber.model");
const {Client} = require("../models/Client.model");
const {User} = require("../models/User.model");
const {sign} = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {extname} = require("path");

const { SECRET_KEY, HASH_SALT } = process.env;

const generateNewToken = (payload) =>
    sign(payload, SECRET_KEY, { expiresIn: "72h" });


module.exports.usersController = {

    login: async (req,res) => {
        try {

        } catch (e) {

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
                await User.create({name, login, password: hashedPassword, role, personal: client.id});
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
                await User.create({name, login, password: hashedPassword, role, personal: barber.id});

                //Ниже всех, чтобы сохранять фотографию только тогда, когда пользователь успешно зарегистрирован
                avatar && await avatar.mv(`./client/public${filePath}`);
                //console.log("Этап 7");
            }
            //console.log("Финалочка");
            res.status(200).json({success: "Пользователь успешно создан"});
        } catch (e) {
            console.log("Бум!");
            res.status(404).json({error: e});
        }
    },

    logout: async (req, res) => {
       try {

       } catch {

       }
    }
}