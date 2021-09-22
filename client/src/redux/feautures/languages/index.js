import { text } from "./localization";
export const lang = localStorage.getItem("lang") || "ru";

const initialState = {
  currentLanguage: lang,
  text: text[lang],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "language/setLanguage": {
      localStorage.setItem("lang", action.language);
      return { ...state, currentLanguage: action.language, text: text[action.language] }}
    default:
      return state;
  }
};

export default reducer;
