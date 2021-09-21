const initialState = {
  loading: false,
  error: null,
  hairstyles: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    
    case "hairstyles/getAllHairstyles/pending":
      return {...state,loading: true };
    case "hairstyles/getAllHairstyles/fulfilled":
      return {...state,loading: false, hairstyles: action.payload };
    case "hairstyles/getAllHairstyles/rejected" :
      return {...state, loading: false, error: action.error};

    default:
      return state;
  }
};

export const getAllHairstyles = () => async (dispatch) => {
  try {
    dispatch({ type: "hairstyles/getAllHairstyles/pending" });

    const res = await fetch(`/hairstyles`);
    const json = await res.json();

    dispatch({ type: "hairstyles/getAllHairstyles/fulfilled",payload: json });
   
  } catch (e) {
    dispatch({ type: "hairstyles/getAllHairstyles/rejected", error: e.toString()});
  }
};

export default reducer;
