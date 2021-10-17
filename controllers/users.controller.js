const Barber = require("../models/Barber.model");
const Client = require("../models/Client.model");
const User = require("../models/User.model");
const Review = require("../models/Review.model");
const {sign, verify} = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {extname} = require("path");
const fs = require("fs");

const phoneRegEx = /^((\+7|7|8)\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{2}[\s.-]?\d{2}$/;
const emailRegEx = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
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

                const {lastname, email, telegram, lat, lng} = req.body;
                const avatar = req.files?.avatar;

                if (!lat && !lng) {
                    return res.status(400).json({error: "Необходимо указать корректное местоположение!"});
                }

                if (!email) {
                    return res.status(404).json({error: "Необходимо указать почту!"});
                }
                if (!(emailRegEx.test(email))) {
                    return res.status(404).json({error: "Ошибка! Некорректный вид почты."});
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

                const barber = await Barber.create({lastname, avatar: filePath, email, telegram, location: {lat, lng} });
                user = await User.create({name, login, password: hashedPassword, role, personal: barber});

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
            const { _id, role } = req.user;
            let user;

            try {
                 if (role === 'Barber') {
                     user = await User.findById(_id, "-password")
                     .populate("personal")
                     .populate({path: "personal", populate: {path: "reviews", populate: {path: "userId", select: "name"}}});
                    } else {
                        user = await User.findById(_id, "-password").populate("personal");
                    }
            } catch (e) {
                console.log(e);
            }

            res.status(200).json({success: "Пользователь успешно найден", user });
        } catch (e) {
            res.status(400).json({error: e});
        }
    },

    addDescriptionToBarber: async (req, res) => {
      try {
          const {_id: barberId} = req.user.personal;
          await Barber.findByIdAndUpdate(barberId, {desc: req.body.desc});

          res.status(200).json({success: "Описание успешно добавлено"});
      }  catch (e) {
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

    // getUsers: async (req, res) => {
    //     try {
    //         const users = await User.find({role: "Client"}).populate("personal");

    //         res.status(200).json({success: "Клиенты успешно загружены", users});
    //     } catch (e) {
    //         res.status(400).json({error: e});
    //     }
    // },
    getBarberById: async (req, res) => {
        try {
            const barber = await User.findById(req.params.id)
            .populate("personal")
            .populate({path: "personal", populate: {path: "reviews", populate: {path: "userId", select: "name"}}});

            if (!barber) 
            return res.status(404).json({error: "Ошибка! Барбера с таким ID не существует"});
          
            return res.status(200).json({success: "Барбер был успешно загружен", barber});
        } catch (e) {
            return res.status(404).json({error: e});
        }
      },

    removeUser: async (req, res) => {
        try {
            const {role, _id, personal} = req.user;

            await (role === "Barber" ? Barber : Client).findByIdAndRemove(personal._id);
            await User.findByIdAndRemove(_id);

            res.status(200).json({success: "Аккаунт успешно удалён"});
        } catch (e) {
            res.status(400).json({error: "Не удалось удалить аккаунт" + e});
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

            if (avatar) {
                const ext = extname(avatar.name);

                if(!((/^.(png|jpe?g|svg)$/i).test(ext))) { //Проверка на нужный нам формат
                    return res.status(400).json({error: "Формат файла вашей аватарки не поддерживается!"});
                }

                filePath = "/assets/images/avatars/" + Math.random() + ext;
            }

            await Barber.findByIdAndUpdate(personal._id, {avatar: filePath});

            avatar && await avatar.mv(`.${filePath}`, function(err) {
                if (err) {
                    console.log(err);
                    return res.status(500).json({error: err});
                }
                console.log("File was uploaded!");
            });

            res.status(200).json({success: "Фотография была успешно изменена!", path: filePath });
        } catch (e) {
            res.status(400).json({error: e});
        }
    },

    updateUserDataBarber: async (req, res) => {
        try {
            const {personal, role, _id} = req.user;
            const { name, ...data } = req.body;

            if (
                ("email" in data && !data.email) || ("telegram" in data && !data.telegram) ||
                ("number" in data && !data.number) || ("lastname" in data && !data.lastname || !name)
               ) {
                return res.status(404).json({error: "Изменённые поля не могут быть пустыми!"});
            }

            if (data.email && !emailRegEx.test(data.email)) {
                return res.status(404).json({error: "Ошибка! Некорректный вид почты."});
            }

            await User.findByIdAndUpdate(_id, {name});
            await (role === "Barber" ? Barber : Client).findByIdAndUpdate(personal._id, data);

            res.status(200).json({success: "Данные были успешно обновлены!"});
        } catch (e) {
            console.log(e);
            res.status(400).json({error: e});
        }
    },

    topUpBalance: async (req, res) => {
        try {
            const {personal, role} = req.user;
            const client = await Client.findById(personal._id)
            const { balance } = req.body;

            if (!balance) {
                return res.status(400).json({error: 'Пожалуйста, укажите сумму'})
            }
            if (role !== 'Client') {
                return res.status(400).json({error: 'Только клиент может пополнить счёт!'});
            }

            if (balance > 10000 || balance <= 0) {
                return res.status(400).json({error: 'Введённая сумма слишком мала, либо превышает лимит!'});
            }
            await Client.findByIdAndUpdate(personal._id, {balance: client.balance + Number(balance)});
            res.status(200).json({success: 'Ваш счёт успешно пополнен!'})
        } catch (e) {
            res.status(400).json({error: e});
        }
    }
}