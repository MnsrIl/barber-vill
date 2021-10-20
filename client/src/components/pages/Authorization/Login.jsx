import {useState} from "react";
import { Paper, Input, InputLabel, withStyles,
    FormControl,  Button , InputAdornment } from "@material-ui/core";
import {IconButton, Snackbar, SnackbarContent, Typography} from "@mui/material";
import { register } from "./RegistrationStyles";
import {useDispatch, useSelector} from "react-redux";
import {green} from "@mui/material/colors";
import {Close, Error, VisibilityTwoTone, VisibilityOffTwoTone} from "@mui/icons-material";
import {useHistory} from "react-router-dom";
import {logInto} from "../../../redux/feautures/auth";
//import logo from "../../images/updated_logo.png"
//import {logIn} from "../../redux/feautures/auth";


const Login = (props) =>  {
    const { error, success, isLoggingIn, isLoggedIn} = useSelector(store => store.auth);

    const { text } = useSelector((store) => store.languages);

    const dispatch = useDispatch();
    const history = useHistory();

    const [state, setState] = useState({
        login: "",
        password: "",
        hidePassword: true,
        statusMessageOpen: false
    })

    const closeStatusMessage = () => {
        setState({...state, statusMessageOpen: false });
        if (success) {
            dispatch({type: "auth/login/success/resetInfo"});
            history.push("/");
        } else {
            dispatch({type: "auth/login/error/resetInfo"});
        }
    };

    const handleChange = name => e => {
        setState({...state,
            [name]: e.target.value
        });
    };

    const showPassword = () => {
        setState({...state, hidePassword: !state.hidePassword });
    };

    const submitAuthorization = e => {
        e.preventDefault();

        const {login, password} = state;
        dispatch(logInto(login, password));

        setState({...state, statusMessageOpen: true});

    };

    const { classes } = props;

    return (
        <div className={classes.main}>

            <Paper className={classes.paper}>
                {(error || success) &&
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
                            style={success && { display: 'flex', color: "#31671a", border: `1.2px solid ${green[900]}`}}
                            message={
                                <div>
                                    <span style={{ marginRight: "8px" }}>
                                      <Error fontSize="large" color={error ? "error" : "success"} />
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
                                    <Close color={error ? "error" : "success"} />
                                </IconButton>
                            ]}
                        />
                    </Snackbar>
                }

                {/*<img className={classes.avatar} src={logo} width={20} height={20}  alt="logo"/>*/}

                <Typography>{text.authorisation}</Typography>
                <form
                    className={classes.form}
                    onSubmit={() => submitAuthorization}
                >
                    <FormControl required fullWidth margin="normal">
                        <InputLabel htmlFor="login" className={classes.labels}>
                            {text.login}
                        </InputLabel>
                        <Input
                            name="login"
                            type="text"
                            autoComplete="off"
                            className={classes.inputs}
                            disableUnderline={true}
                            onChange={handleChange("login")}
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
                            disableUnderline={true}
                            onChange={handleChange("password")}
                            type={state.hidePassword ? "password" : "input"}
                            endAdornment={
                                state.hidePassword ? (
                                    <InputAdornment position="end">
                                        <VisibilityOffTwoTone
                                            fontSize="medium"
                                            className={classes.passwordEye}
                                            onClick={showPassword}
                                        />
                                    </InputAdornment>
                                ) : (
                                    <InputAdornment position="end">
                                        <VisibilityTwoTone
                                            fontSize="medium"
                                            className={classes.passwordEye}
                                            onClick={showPassword}
                                        />
                                    </InputAdornment>
                                )
                            }
                        />
                    </FormControl>
                    <div /> <br />
                    <Typography
                        className={classes.haveAccount}
                        onClick={() => history.push("/signup")}
                    >
                        {text.signUpMessage}
                    </Typography>

                    <Button
                        disabled={isLoggingIn}
                        disableRipple
                        fullWidth
                        variant="outlined"
                        className={classes.button}
                        type="submit"
                        onClick={submitAuthorization}
                    >
                        {text.LogIn}
                    </Button>
                </form>
            </Paper>
        </div>
    );
}

export default withStyles(register)(Login);