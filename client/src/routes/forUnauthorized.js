const {SignUp, Login} = require("./componentsList");

const list = [
    {
        name: "Регистрация",
        path: "/signup",
        exact: true,
        component: SignUp,
    },
    {
        name: "Авторизация",
        path: "/login",
        exact: true,
        component: Login,
    },
]

export default list;