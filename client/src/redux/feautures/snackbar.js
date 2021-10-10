const initialState = {
    isSnackbarOpen: false,
    snackbarType: "info",
    snackbarMessage: ""
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'snackbar/openSnackbar' :
            const { snackbarType, snackbarMessage } = action.payload;
            return {
                ...state,
                isSnackbarOpen: true,
                snackbarType,
                snackbarMessage,
            };

        case "snackbar/closeSnackbar" :
            return {...state, isSnackbarOpen: false, snackbarType: 'info', snackbarMessage: ''};

        default :
            return state;
    }
}

export default reducer;

export const setSnackbar = (snackbarType = "success", snackbarMessage = "") =>
    ({
        type: 'snackbar/openSnackbar',
        payload: {
            snackbarType,
            snackbarMessage
        }
});

export const closeSnackbar = () => ({type: "snackbar/closeSnackbar"});

export const selectSnackbarType = (store) => store.snackbar.snackbarType;

export const selectIsSnackbarOpen = (store) => store.snackbar.isSnackbarOpen;

export const selectSnackbarMessage = (store) => store.snackbar.snackbarMessage;