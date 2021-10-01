const initialState = {
  adding: false,
  error: null,
  success: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
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

export default reducer;
