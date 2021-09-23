import hairstylesReducer from "./hairstyles";
import languagesReducer from "./languages";
import authReducer from "./auth";

export const reducers = {
    languages: languagesReducer,    
    hairstyles: hairstylesReducer,
    auth: authReducer
}