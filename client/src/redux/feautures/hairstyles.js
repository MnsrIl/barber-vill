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

    case "hairstyles/getOneHairstyle/pending":
      return {...state,loading: true };
    case "hairstyles/getOneHairstyle/fulfilled":
      return {...state,loading: false, currentHairstyle: action.payload };
    case "hairstyles/getOneHairstyle/rejected" :
      return {...state, loading: false, error: action.error};
    default:
      return state;
  }
};

export const getAllHairstyles = (categoryId, gender) => async (dispatch) => {
  dispatch({ type: "hairstyles/getAllHairstyles/pending" });

  //Получение всех причёсок. Если передан параметр с категорией, то отображаются именно причёски по категориям, иначе отображаются все причёски по полу
  const res = await fetch(`http://localhost:3010/api${categoryId ? `/category/${categoryId}/hairstyles` : `/hairstyles/${gender}` }`);
  const json = await res.json();
  if (json.error) {
    dispatch({ type: "hairstyles/getAllHairstyles/rejected", error: json.error});
  } else {
    dispatch({ type: "hairstyles/getAllHairstyles/fulfilled", payload: json.data });
  }
};

export const getOneHairstyle = (id) => async (dispatch) => {
    dispatch({type:"hairstyles/getOneHairstyle/pending"})

    const response = await fetch(`/api/hairstyles/${id}`);
    const json = await response.json();

    if (json.error) {
      dispatch({ type: "hairstyles/getOneHairstyle/rejected", error: json.error});
    } else {
      dispatch({ type: "hairstyles/getOneHairstyle/fulfilled", payload: json });
    }

}

export default reducer;
