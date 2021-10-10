import {Alert, Snackbar} from "@mui/material";
import {makeStyles} from "@mui/styles";
import {useDispatch, useSelector} from "react-redux";
import {
    closeSnackbar,
    selectIsSnackbarOpen,
    selectSnackbarMessage,
    selectSnackbarType
} from "../../redux/feautures/snackbar";

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%",
        "& > * + *": {
            marginTop: "16px"
        }
    }
}));

function GlobalSnackbar (props) {
    const dispatch = useDispatch();
    const classes = useStyles();

    const open = useSelector(selectIsSnackbarOpen);
    const type = useSelector(selectSnackbarType);
    const message = useSelector(selectSnackbarMessage);

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return
        }

        dispatch(closeSnackbar());
    }

    return (
        <div className={classes.root}>
            <Snackbar open={open} disableWindowBlurListener autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
                    {message?.toString()}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default GlobalSnackbar