import hairstylesReducer from "./hairstyles";
import languagesReducer from "./languages";
import beardsReducer from "./beards";
import authReducer from "./auth";
import barbersReducer from "./barbers"
import clientsReducer from "./clients"

export const reducers = {
    languages: languagesReducer,    
    hairstyles: hairstylesReducer,
    beards: beardsReducer,
    auth: authReducer,
    barbers:barbersReducer,
    clients:clientsReducer
};