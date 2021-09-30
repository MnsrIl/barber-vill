const initialState = {
  allCategories: [],
  loading: false,
  error: null,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {

    case "categories/loadCategories/pending" :
      return {...state, loading: true, error: null}
    case "categories/loadCategories/rejected" :
      return {...state, loading: false, error: action.error}
    case "categories/loadCategories/fulfilled" : {
      return {...state, allCategories: action.payload, loading: false}
    }
    default:
      return state;
  }
}

export const loadCategories = (gender) => async (dispatch) => {
  dispatch({type: "categories/loadCategories/pending"});

  const res = await fetch(`/api/categories/${gender}`);
  const json = await res.json();

  if (json.error) {
    dispatch({type: "categories/loadCategories/rejected", error: json.error});
  } else {
    dispatch({type: "categories/loadCategories/fulfilled", payload: json.data});
  }
}

export default reducer;