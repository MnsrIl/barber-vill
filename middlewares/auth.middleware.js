const {verify} = require("jsonwebtoken");

module.exports = async (req, res, next) => {
    if (req.method === 'OPTIONS') next();

    try {
        const { authorization } = req.headers;

        if (!authorization)
            return res.status(404).json({error: "Пользователь не авторизован!"});

        const [type, token] = authorization.split(" ");

        const isValidType = (type === "Bearer");
        const isValidToken = await verify(token, process.env.SECRET_KEY);

        if (!isValidType || !isValidToken) {
            return res.status(404).json({error: "Ошибка! Ваш токен не валиден!"});
        }

        req.user = isValidToken;

        next();
    } catch (e) {
        return res.status(400).json({error: "Пользователь не авторизован!" + e});
    }
}