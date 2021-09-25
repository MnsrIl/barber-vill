import {useState} from 'react';
import {
    Avatar,
    Button,
    FormControl,
    FormControlLabel,
    Input,
    InputAdornment,
    InputLabel,
    withStyles
} from "@material-ui/core";
import { register } from "../RegistrationStyles";
import {Checkbox, Collapse, IconButton, Snackbar, SnackbarContent, Tooltip, Typography} from "@mui/material";
import {PeopleAlt, VisibilityOffTwoTone, VisibilityTwoTone} from "@material-ui/icons";
import {Close, Error, Telegram} from "@mui/icons-material";
import {blue, green} from "@mui/material/colors";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {createNewUser} from "../../../../redux/feautures/auth";

const SignUpAvatar = ({classes, state}) => (
    <Tooltip title={"Выберите аватарку"}>
        <Avatar className={`${classes.avatar} ${classes.signup}`}>
            {state.avatar?.length ?
                <img src={URL.createObjectURL(state.avatar[0])} alt="Аватар" width={100} height={100} /> :
                <PeopleAlt className={classes.icon} /> }
        </Avatar>
    </Tooltip>
);

const AsBarber = ({classes, userType, setUserType}) => {

    const dispatch = useDispatch();
    const history = useHistory();

    const {error, success, isSigningUp} = useSelector(store => store.auth);

    const [state, setState] = useState({
        name: null,
        lastname: null,
        email: null,
        login: null,
        password: null,
        telegram: "",
        avatar: null,
        hidePassword: true,
        statusMessageOpen: false
    })

    const [hasTelegram, setHasTelegram] = useState(false);

    const handleChangeChecked = (e) => {
        setHasTelegram(e.target.checked);
        hasTelegram && closeTelegram()
    };

    const closeStatusMessage = () => {
        setState({...state, statusMessageOpen: false });
        if (success) {
            dispatch({type: "auth/login/success/resetInfo"});
            history.push("/");
        } else {
            dispatch({type: "auth/createNewUser/resetInfo"});
        }
    };

    const handleChange = (name, option = "value") => e => {
        setState({...state,
            [name]: e.target[option]
        });
    };

    const showPassword = () => {
        setState({...state, hidePassword: !state.hidePassword });
    };

    const closeTelegram = () => {
        setState({...state, telegram: ""});
    }

    const submitRegistration = e => {
        e.preventDefault();
        const {name, lastname, avatar, telegram, email, login, password} = state;
        const newUserCredentials = {name, lastname, avatar, telegram, email, login, password, role: userType};

        dispatch(createNewUser(newUserCredentials));
        setState({...state, statusMessageOpen: true});
    };

    return (
        <>
            {(error || success) && <Snackbar
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
                    style={success && {color: "#31671a", border: `1.2px solid ${green[900]}`}}
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
            </Snackbar>}


            <FormControlLabel
                style={{marginRight: "-9px"}}
                control={
                    <input name="avatar" accept="image/*" className={classes.fileInput} type="file" />
                }
                label={<SignUpAvatar classes={classes} state={state} />}
                onChange={handleChange("avatar", "files")}
            />

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
                        disableUnderline
                        onChange={handleChange("name")}
                    />
                </FormControl>
                <FormControl required margin="normal">
                    <InputLabel htmlFor="lastname" className={classes.labels}>
                        фамилия
                    </InputLabel>
                    <Input
                        name="lastname"
                        type="text"
                        autoComplete="off"
                        className={classes.inputs}
                        disableUnderline
                        onChange={handleChange("lastname")}
                    />
                </FormControl>
                <FormControl required fullWidth margin="normal">
                    <InputLabel htmlFor="email" className={classes.labels}>
                        почта
                    </InputLabel>
                    <Input
                        name="email"
                        type="text"
                        autoComplete="off"
                        className={classes.inputs}
                        disableUnderline
                        onChange={handleChange("email")}
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
                        disableUnderline
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
                        disableUnderline
                        onChange={handleChange("password")}
                        type={state.hidePassword ? "password" : "text"}
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

                <Collapse in={hasTelegram}>
                    <FormControl fullWidth margin="normal">
                        <InputLabel htmlFor="telegram" className={classes.labels}>
                            телеграмм
                        </InputLabel>
                        <Input
                            value={state.telegram}
                            name="telegram"
                            type="text"
                            autoComplete="off"
                            className={classes.inputs}
                            disableUnderline
                            onChange={handleChange("telegram")}
                        />
                    </FormControl>
                </Collapse>

                <FormControlLabel label={!hasTelegram && "Есть телеграмм?"} style={{marginLeft: 0}} control={
                    <Checkbox
                        style={{color: "rgba(206,212,218, .993)"}}
                        className={classes.telegramCheckbox}
                        icon={<Telegram />}
                        checkedIcon={<Telegram sx={{color: blue[500]}} />}
                        checked={hasTelegram}
                        onChange={handleChangeChecked}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                } />

                <div /> <br />

                <Typography
                    className={classes.haveAccount}
                    onClick={() => history.push("/login")}
                >
                    Уже есть аккаунт?
                </Typography>

                <Typography
                    className={classes.haveAccount}
                    onClick={() => setUserType('Client')}
                >
                    Я - Клиент
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
                    Войти
                </Button>
            </form>
        </>
    );
};

export default withStyles(register)(AsBarber);