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
import {Typography} from "@mui/material";
import {VisibilityOffTwoTone, VisibilityTwoTone} from "@material-ui/icons";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";

const AsClient = ({classes, setUserType}) => {

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

    const closeStatusMessage = e => {
        setState({...state, statusMessageOpen: false });

        // if (success) {
        //     dispatch({type: "auth/data/clear"});
        //     return history.push("/sign-in")
        // }
        // dispatch({type: "auth/data/clear"});
    };

    const handleChange = (name, option = "value") => e => {
        setState({...state,
            [name]: e.target[option]
        });
    };

    const showPassword = () => {
        setState({...state, hidePassword: !state.hidePassword });
    };

    const submitRegistration = e => {
        e.preventDefault();
        const { name, number, login, password } = state;
        const newUserCredentials = { name, number, login, password };

        console.log(newUserCredentials);
        //dispatch(signUp(newUserCredentials));

        setState({...state, statusMessageOpen: true});
    };

    return (
        <>
            {/*{(error || success) && (*/}
            {/*    <Snackbar*/}
            {/*        variant={error ? "error" : "success"}*/}
            {/*        key={error || success}*/}
            {/*        anchorOrigin={{*/}
            {/*            vertical: "top",*/}
            {/*            horizontal: "center"*/}
            {/*        }}*/}
            {/*        anchorPosition={{top: 200}}*/}
            {/*        open={state.statusMessageOpen}*/}
            {/*        onClose={closeStatusMessage}*/}
            {/*        autoHideDuration={3000}*/}
            {/*    >*/}
            {/*        <SnackbarContent*/}
            {/*            className={classes.error}*/}
            {/*            style={success && {color: "#31671a", border: `1.2px solid ${green[900]}`}}*/}
            {/*            message={*/}
            {/*                <div>*/}
            {/*                    <span style={{ marginRight: "8px" }}>*/}
            {/*                      <Error fontSize="large" color={error ? "error" : "success"} />*/}
            {/*                    </span>*/}
            {/*                    <span> {error || success} </span>*/}
            {/*                </div>*/}
            {/*            }*/}
            {/*            action={[*/}
            {/*                <IconButton*/}
            {/*                    key="close"*/}
            {/*                    aria-label="close"*/}
            {/*                    onClick={closeStatusMessage}*/}
            {/*                >*/}
            {/*                    <Close color={error ? "error" : "success"} />*/}
            {/*                </IconButton>*/}
            {/*            ]}*/}
            {/*        />*/}
            {/*    </Snackbar>)}*/}

            {/*<FormControlLabel*/}
            {/*    style={{marginRight: "-9px"}}*/}
            {/*    control={*/}
            {/*        <input name="avatar" accept="image/*" className={classes.fileInput} type="file" />*/}
            {/*    }*/}
            {/*    label={<SignUpAvatar classes={classes} state={state} />}*/}
            {/*    onChange={handleChange("avatar", "files")}*/}
            {/*/>*/}
            <Typography>Регистрация</Typography>

            <form
                className={classes.form}
                onSubmit={() => submitRegistration}
            >
                <FormControl required margin="normal">
                    <InputLabel htmlFor="name" className={classes.labels}>
                        имя
                    </InputLabel>
                    <Input
                        name="name"
                        type="text"
                        autoComplete="off"
                        className={classes.inputs}
                        disableUnderline={true}
                        onChange={handleChange("name")}
                    />
                </FormControl>
                <FormControl required fullWidth margin="normal">
                    <InputLabel htmlFor="number" className={classes.labels}>
                        телефон
                    </InputLabel>
                    <Input
                        name="number"
                        type="text"
                        autoComplete="off"
                        className={classes.inputs}
                        disableUnderline={true}
                        onChange={handleChange("number")}
                    />
                </FormControl>

                <FormControl required fullWidth margin="normal">
                    <InputLabel htmlFor="login" className={classes.labels}>
                        логин
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
                        пароль
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
                    onClick={() => history.push("/signin")}
                >
                    Уже есть аккаунт?
                </Typography>
                <Typography
                    className={classes.haveAccount}
                    onClick={() => setUserType('')}
                >
                    Я - Парикмахер
                </Typography>

                <Button
                    //disabled={isSigningUp}
                    disableRipple
                    fullWidth
                    variant="outlined"
                    className={classes.button}
                    type="submit"
                    onClick={submitRegistration}
                >
                    Войти
                </Button>
            </form>
        </>
    );
};

export default withStyles(register)(AsClient);