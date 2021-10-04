const initialState = {
    adding: false,
    topUpping: false,
    error: null,
    success: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        //Очистка не нужного
        case "client/clearData" :
            return {...state, error: null, success: null}

        //Добавление заявки
        case "clients/sendRequest/pending" :
            return {...state, sendingRequest: true}
        case "clients/sendRequest/rejected" :
            return {...state, sendingRequest: false, error: action.error}
        case "clients/sendRequest/fulfilled" :
            return {...state, sendingRequest: false, success: action.success}

        //Пополнение баланса
        case "client/topUpBalance/pending" :
            return {...state, topUpping: true}
        case "client/topUpBalance/rejected" :
            return {...state, topUpping: false, error: action.error}
        case "client/topUpBalance/fulfilled" :
            return {...state, topUpping: false, success: action.success}

        //Добавление комментария
        case "reviews/addReviews/pending" :
            return {...state, adding: true, error: null, success: null}
        case "reviews/addReviews/rejected" :
            return {...state, adding: false, error: action.error}
        case "reviews/addReviews/fulfilled" :
            return {...state, adding: false, success: action.success}
        default:
            return state;
    }
};

export const addReviews = (text) => async (dispatch, getStore) => {
    const store = getStore();

    dispatch({ type: "reviews/addReviews/pending" });

    const res = await fetch("/api/reviews", {
        method: "POST",
        body: JSON.stringify({ text, barberId: store.barbers.currentBarber.personal._id }),
        headers: {
            "Content-Type": "application/json",
            Authorization: store.auth.token,
        },
    });
    const json = await res.json();

    if (json.error) {
        dispatch({ type: "reviews/addReviews/rejected", error: json.error });
    } else {
        dispatch({ type: "reviews/addReviews/fulfilled", success: json.success });
        dispatch({
            type: "barbers/addReviewsBarbers",
            payload: { ...json.review, userId: store.auth.person },
        });
    }
};



export const sendRequest = (data) => async (dispatch, getStore) => {
  dispatch({type: "clients/sendRequest/pending"});

  const store = getStore();

  const res = await fetch("/api/requests", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
          'Content-Type' : 'application/json',
          Authorization: store.auth.token
      }
  });
  const json = await res.json();

  if (json.error) {
      dispatch({type: "clients/sendRequest/rejected", error: json.error});
  } else {
      dispatch({type: "clients/sendRequest/fulfilled", payload: {success: json.success}});
  }
};



export const topUpBalance = (balance) => async (dispatch, getStore) => {

    const store = getStore();

    dispatch({type: 'client/topUpBalance/pending'});

    const res = await fetch("/api/clients/topUpBalance", {
        method: "POST",
        body: JSON.stringify({ balance }),
        headers: {
            "Content-Type": "application/json",
            Authorization: store.auth.token,
        },
    });
    const json = await res.json();

    if (json.error) {
        dispatch({ type: 'client/topUpBalance/rejected', error: json.error });
    } else {
        dispatch({ type: 'client/topUpBalance/fulfilled', success: json.success });
        dispatch({type: "auth/topUp", payload: { balance }});
    }
}

export default reducer;
