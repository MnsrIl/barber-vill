const initialState = {
  loading: false,
  error: null,
  beards: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {

    case "beards/getAllBeards/pending":
      return {...state,loading: true };
    case "beards/getAllBeards/fulfilled":
      return {...state,loading: false, beards: action.payload };
    case "beards/getAllBeards/rejected" :
      return {...state, loading: false, error: action.error};

    case "beards/getOneBeard/pending":
      return {...state,loading: true };
    case "beards/getOneBeard/fulfilled":
      return {...state,loading: false, currentBeards: action.payload };
    case "beards/getOneBeard/rejected" :
      return {...state, loading: false, error: action.error};
    default:
      return state;
  }
};

export const getAllBeards = () => async (dispatch) => {
  try {
    dispatch({ type: "beards/getAllBeards/pending" });

    const res = await fetch(`/api/beards`);
    const json = await res.json();

    dispatch({ type: "beards/getAllBeards/fulfilled",payload: json });

  } catch (e) {
    dispatch({ type: "beards/getAllBeards/rejected", error: e.toString()});
  }
};

export const getOneBeard = (id) => async (dispatch) => {
  try{
    dispatch({type:"beards/getOneBeard/pending"})

    const response = await fetch(`/api/beards/${id}`);
    const json = await response.json();

    dispatch({ type: "beards/getOneBeard/fulfilled", payload: json });

  } catch (e) {
    dispatch({ type: "beards/getOneBeard/rejected", error: e.toString()});
  }
}

export default reducer;
