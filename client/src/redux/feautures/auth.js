import Cookies from 'js-cookie';

const tokenCookie = Cookies.get("token");

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

        //Обновление данных пользователя
        case "auth/updateUserData/pending" :
            return {...state, success: null, error: null, dataUpdating: true}
        case "auth/updateUserData/rejected" :
            return {...state, error: action.error, dataUpdating: undefined}
        case "auth/updateUserData/fulfilled" : {
            const {data: {name, ...rest}, success} = action.payload
            return {
                ...state, success, dataUpdating: undefined,
                person: {
                    ...state.person, name,
                    personal: {...state.person.personal, ...rest}
                }
            }
        }

        //Обновление аватарки Парикмахера
        case "auth/updateAvatar/pending" :
            return {...state, error: null, success: null, avatarUpdating: true}
        case "auth/updateAvatar/rejected" :
            return {...state, error: action.error, avatarUpdating: undefined}
        case "auth/updateAvatar/fulfilled" : {
            const {avatar, success} = action.payload;
            return {
                ...state, success, avatarUpdating: undefined,
                person: {...state.person,
                    personal: {...state.person.personal, avatar}}
            };
        }


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


/*\-------------------<>-------------------\*/


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


/*\-------------------<>-------------------\*/


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


/*\-------------------<>-------------------\*/


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


/*\-------------------<>-------------------\*/


export const updateAvatar = (avatar) => async (dispatch, getStore) => {
    dispatch({type: "auth/updateAvatar/pending"});

    const store = getStore();
    const formData = new FormData();
    formData.set("avatar", avatar ? avatar[0] : "");

    const res = await fetch("/api/barbers/updateAvatar", {
        method: "PATCH",
        body: formData,
        headers: {
            Authorization: store.auth.token
        }
    });
    const json = await res.json();

    if (json.error) {
        dispatch({type: "auth/updateAvatar/rejected", error: json.error});
    } else {
        dispatch({type: "auth/updateAvatar/fulfilled", payload: {success: json.success, avatar: json.path}});
    }
}


/*\-------------------<>-------------------\*/


export const updateUserData = (data) => async (dispatch, getStore) => {
    const store = getStore();
    dispatch({type: "auth/updateUserData/pending"});

    const res = await fetch("/api/updateData", {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            Authorization: store.auth.token
        }
    });
    const json = await res.json();

    if (json.error) {
        dispatch({type: "auth/updateUserData/rejected", error: json.error});
    } else {
        dispatch({type: "auth/updateUserData/fulfilled", payload: {success: json.success, data}});
    }
}

export default reducer;
