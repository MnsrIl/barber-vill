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

export default reducer;
