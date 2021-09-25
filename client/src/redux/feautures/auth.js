import Cookies from 'js-cookie';

const tokenCookie = Cookies.get("token");
//console.log(getCookie(), document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, "$1"));

const initialState = {
    isLoggingIn: false,
    isSigningUp: false,
    isLoggedIn: !!tokenCookie,
    error: null,
    success: null,
    person: null,
    token: Cookies.get("token") || null,
}

//

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "auth/logout" : {
            Cookies.remove("token");
            return {...state, isLoggedIn: false, token: null, person: null}
        }
        //Загрузка информации о авторизованном пользователе
        case "auth/loadUser/pending" :
            return {...state, userLoading: true}
        case "auth/loadUser/rejected" :
            return {...state, error: action.error, userLoading: undefined}
        case "auth/loadUser/fulfilled" :
            return {...state, person: action.payload.user, userLoading: undefined}

        //Вход в аккаунт
        case "auth/login/error/resetInfo" :
            return {...state, success: null, error: null, isLoggingIn: false}
        case "auth/login/success/resetInfo" :
            return {...state, isLoggingIn: false, isSigningUp: false, isLoggedIn: true, success: null}

        case "auth/login/pending" :
            return {...state, success: null, error: null, isLoggingIn: true}
        case "auth/login/rejected" :
            return {...state, error: action.error}
        case "auth/login/fulfilled" : {
            return {...state, success: action.payload.success, token: action.payload.token}
        }

        //Регистрация нового пользователя
        case "auth/createNewUser/resetInfo" :
            return {...state, success: null, error: null, isSigningUp: false}

        case "auth/createNewUser/pending" :
            return {...state, success: null, error: null, isSigningUp: true }
        case "auth/createNewUser/rejected" :
            return {...state, error: action.error}
        case "auth/createNewUser/fulfilled" :
            return {...state, success: action.payload.success, token: action.payload.token}

        default:
            return state;
    }
}

//
//
//
//

export const createNewUser = (data) => async (dispatch) => {
    dispatch({type: "auth/createNewUser/pending"});

    const formData = new FormData();
    const { avatar } = data;

    for (let key in data ) {
        if (key === "avatar" && avatar) {
            formData.set("avatar", avatar[0]);
        } else {
            formData.set(key, data[key]);
        }
    }

    const res = await fetch("/api/signup", {
        method: "POST",
        body: formData,
    });
    const json = await res.json();

    if (json.error) {
        dispatch({type: "auth/createNewUser/rejected", error: json.error});
    } else {
        dispatch({type: "auth/createNewUser/fulfilled", payload: { success: json.success, token: json.token }});
        Cookies.set("token", json.token, {expires: 3});
    }

}

//
//
//

export const logInto = (login, password) => async (dispatch) => {
    dispatch({type: "auth/login/pending"});

    const res = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify({login, password}),
        headers: {
            "Content-Type" : "application/json",
        }
    });
    const json = await res.json();

    if (json.error) {
        return dispatch({type: "auth/login/rejected", error: json.error});
    } else {
        dispatch({type: "auth/login/fulfilled", payload: { success: json.success, token: json.token }});
        Cookies.set("token", json.token, {expires: 3});
    }
}

//
//
//

export const loadUser = () => async (dispatch, getStore) => {

    const store = getStore();

    dispatch({type: "auth/loadUser/pending"}); //First stage

    const res = await fetch("/api/profile", {
        headers: {
            Authorization: store.auth.token,
        }
    });
    const json = await res.json();

    if (json.error) {
        dispatch({type: "auth/loadUser/rejected", error: json.error}); //Second stage
    } else {
        console.log(json.user);
        dispatch({type: "auth/loadUser/fulfilled", payload: {user: json.user, success: json.success}}); //Third stage
    }
}

export default reducer;

//Если пользователь зарегистрировался, то должен -будет- присвоиться токен, person должен быть заполнен;
// так же должны прийти либо ключ error, либо success; Если success - то он идёт дальше, через некоторый тайминг.
// При скрытии окна в стейте ключи error и success должны очиститься
//
//При выходе должен очиститься токен, и всё ему принадлежащее