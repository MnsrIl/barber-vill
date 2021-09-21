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
import {Checkbox, Collapse, Typography} from "@mui/material";
import {PeopleAlt, VisibilityOffTwoTone, VisibilityTwoTone} from "@material-ui/icons";
import {Telegram} from "@mui/icons-material";
import {blue} from "@mui/material/colors";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";

// const SignUpAvatar = ({classes, state}) => (
//     <Avatar className={`${classes.avatar} ${classes.signup}`}
//             style={state.avatar ? {backgroundColor: "#344892"} : null}>
//         <PeopleAlt className={classes.icon} /> {/*Если пользователь выбрал аватарку, то фон меняется */}
//     </Avatar>
// );

const AsClient = ({classes, setUserType}) => {

    const dispatch = useDispatch();
    const history = useHistory();

    const [state, setState] = useState({
        login: "",
        password: "",
        telegram: "",
        hidePassword: true,
        statusMessageOpen: false
    })

    const [checked, setChecked] = useState(false);

    const handleChangeChecked = (event) => {
        setChecked(event.target.checked);
    };

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
        const newUserCredentials = {
            avatar_URI: state.avatar,
            telegram_URI: state.telegram,
            login: state.login,
            password: state.password,
        };
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
                    <InputLabel htmlFor="login" className={classes.labels}>
                        телефон
                    </InputLabel>
                    <Input
                        name="login"
                        type="text"
                        autoComplete="off"
                        className={classes.inputs}
                        disableUnderline={true}
                        onChange={handleChange("phoneNumber")}
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

                {/*<Collapse in={checked}>*/}
                {/*    <FormControl fullWidth margin="normal">*/}
                {/*        <InputLabel htmlFor="telegram" className={classes.labels}>*/}
                {/*            номер*/}
                {/*        </InputLabel>*/}
                {/*        <Input*/}
                {/*            name="telegram"*/}
                {/*            type="text"*/}
                {/*            autoComplete="off"*/}
                {/*            className={classes.inputs}*/}
                {/*            disableUnderline={true}*/}
                {/*            onChange={handleChange("number")}*/}
                {/*        />*/}
                {/*    </FormControl>*/}
                {/*</Collapse>*/}
                {/*<FormControlLabel label={!checked && "Номер телефона"} style={{marginLeft: 0}} control={*/}
                {/*    <Checkbox*/}
                {/*        style={{color: "rgba(206,212,218, .993)",/* borderRadius: 10*!/}*/}
                {/*        className={classes.telegramCheckbox}*/}
                {/*        icon={<Telegram />}*/}
                {/*        checkedIcon={<Telegram sx={{color: blue[500]}} />}*/}
                {/*        checked={checked}*/}
                {/*        onChange={handleChangeChecked}*/}
                {/*        inputProps={{ 'aria-label': 'controlled' }}*/}
                {/*    />*/}
                {/*} />*/}

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