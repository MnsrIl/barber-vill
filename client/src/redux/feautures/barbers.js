const initialState = {
  loading: false,
  error: null,
  barbers: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "barbers/getAllBarbers/pending":
        return {...state,loading: true };
    case "barbers/getAllBarbers/fulfilled":
        return {...state,loading: false, barbers: action.payload };
    case "barbers/getAllBarbers/rejected" :
        return {...state, loading: false, error: action.error};

    case "barbers/getOneBarber/pending":
        return {...state,loading: true };
    case "barbers/getOneBarber/fulfilled":
        return {...state,loading: false, currentBarber: action.payload };
    case "barbers/getOneBarber/rejected" :
        return {...state, loading: false, error: action.error};

    case "barbers/addReviewsBarbers" :
      return {...state, currentBarber: {...state.currentBarber, 
        personal: {...state.currentBarber.personal, reviews: [...state.currentBarber.personal.reviews, action.payload]}}}
  
    default:
      return state;
  }
};

export const getAllBarbers = () => async (dispatch) => {
  dispatch({ type: "barbers/getAllBarbers/pending" });

  const res = await fetch("/api/barbers");
  const json = await res.json();

  if (json.error) {
    dispatch({ type: "barbers/getAllBarbers/rejected", error: json.error});
  } else {
    dispatch({ type: "barbers/getAllBarbers/fulfilled", payload: json.barbers });
  }
};

export const getOneBarber = (id) => async (dispatch) => {
    dispatch({type:"barbers/getOneBarber/pending"})

    const res = await fetch(`/api/barber/${id}`);
    const json = await res.json();

  if (json.error) {
    dispatch({ type: "barbers/getOneBarber/rejected", error: json.error});
  } else {
    dispatch({ type: "barbers/getOneBarber/fulfilled", payload: json.barber});
  }
}

export default reducer;
