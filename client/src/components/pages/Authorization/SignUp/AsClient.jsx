import {useState} from 'react';
import {
    Button,
    FormControl,
    Input,
    InputAdornment,
    InputLabel,
    withStyles
} from "@material-ui/core";
import { register } from "../RegistrationStyles";
import {IconButton, Snackbar, SnackbarContent, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {createNewUser} from "../../../../redux/feautures/auth";
import {Close, Error, VisibilityOffTwoTone, VisibilityTwoTone} from "@mui/icons-material";

const AsClient = ({classes, setUserType, userType}) => {

    const { success, error, isSigningUp } = useSelector(store => store.auth);

    const { text } = useSelector((store) => store.languages);

    const dispatch = useDispatch();
    const history = useHistory();

    const [state, setState] = useState({
        login: "",
        password: "",
        name: "",
        number: "",
        hidePassword: true,
        statusMessageOpen: false
    })

    const closeStatusMessage = () => {
        setState({...state, statusMessageOpen: false });

        if (success) {
            dispatch({type: "auth/login/success/resetInfo"});
            history.push("/");
        } else {
            dispatch({type: "auth/createNewUser/resetInfo"});
        }
    };

    const handleChange = e => {
        setState({...state,
            [e.target.name]: e.target.value
        });
    };

    const showPassword = () => {
        setState({...state, hidePassword: !state.hidePassword });
    };

    const submitRegistration = async (e) => {
        e.preventDefault();
        const newUserCredentials = {...state, role: userType, hidePassword: undefined, statusMessageOpen: undefined};

        await dispatch(createNewUser(newUserCredentials));

        setState({...state, statusMessageOpen: true});
    };

    return (
        <>
            <Snackbar
                variant={error ? "error" : "success"}
                key={error || success}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "center"
                }}
                open={state.statusMessageOpen}
                onClose={closeStatusMessage}
                autoHideDuration={3000}
            >
                <SnackbarContent
                    className={classes.error}
                    style={success && {color: "#31671a", border: "1.2px solid #1b5e20"}}
                    message={
                        <div>
                            <span style={{marginRight: "8px"}}>
                              <Error fontSize="large" color={error ? "error" : "success"}/>
                            </span>
                            <span> {error || success} </span>
                        </div>
                    }
                    action={[
                        <IconButton
                            key="close"
                            aria-label="close"
                            onClick={closeStatusMessage}
                        >
                            <Close color={error ? "error" : "success"}/>
                        </IconButton>
                    ]}
                />
            </Snackbar>

            <Typography>{text.registration}</Typography>

            <form
                className={classes.form}
                onSubmit={() => submitRegistration}
            >
                <FormControl required margin="normal" style={{width: "160px"}}>
                    <InputLabel htmlFor="name" className={classes.labels}>
                        {text.name}
                    </InputLabel>
                    <Input
                        name="name"
                        type="text"
                        autoComplete="off"
                        className={classes.inputs}
                        disableUnderline
                        onChange={handleChange}
                    />
                </FormControl>
                <FormControl required margin="normal" style={{width: "160px"}}>
                    <InputLabel htmlFor="number" className={classes.labels}>
                        {text.numberPhone}
                    </InputLabel>
                    <Input
                        name="number"
                        type="text"
                        autoComplete="off"
                        className={classes.inputs}
                        disableUnderline
                        onChange={handleChange}
                    />
                </FormControl>

                <FormControl required fullWidth margin="normal">
                    <InputLabel htmlFor="login" className={classes.labels}>
                        {text.login}
                    </InputLabel>
                    <Input
                        name="login"
                        type="text"
                        autoComplete="off"
                        className={classes.inputs}
                        disableUnderline
                        onChange={handleChange}
                    />
                </FormControl>
                <FormControl required fullWidth margin="normal">
                    <InputLabel htmlFor="password" className={classes.labels}>
                        {text.password}
                    </InputLabel>
                    <Input
                        name="password"
                        autoComplete="off"
                        className={classes.inputs}
                        disableUnderline
                        onChange={handleChange}
                        type={state.hidePassword ? "password" : "input"}
                        endAdornment={
                                <InputAdornment position="end">
                                    {state.hidePassword ?
                                        <VisibilityOffTwoTone
                                            fontSize="medium"
                                            className={classes.passwordEye}
                                            onClick={showPassword}
                                        /> :
                                        <VisibilityTwoTone
                                            fontSize="medium"
                                            className={classes.passwordEye}
                                            onClick={showPassword}
                                        />
                                    }
                                </InputAdornment>
                        }
                    />
                </FormControl>

                <div /> <br />

                <Typography
                    className={classes.haveAccount}
                    onClick={() => history.push("/login")}
                >
                    {text.signInMessage}
                </Typography>
                <Typography
                    className={classes.haveAccount}
                    onClick={() => setUserType('Barber')}
                >
                    {text.iBarber}
                </Typography>

                <Button
                    disabled={isSigningUp}
                    disableRipple
                    fullWidth
                    variant="outlined"
                    className={classes.button}
                    type="submit"
                    onClick={submitRegistration}
                >
                    {text.LogIn}
                </Button>
            </form>
        </>
    );
};

export default withStyles(register)(AsClient);