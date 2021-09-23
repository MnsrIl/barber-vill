import hairstylesReducer from "./hairstyles";
import languagesReducer from "./languages";
import beardsReducer from "./beards";
import authReducer from "./auth";

export const reducers = {
    languages: languagesReducer,    
    hairstyles: hairstylesReducer,
    beards: beardsReducer,
    auth: authReducer
};