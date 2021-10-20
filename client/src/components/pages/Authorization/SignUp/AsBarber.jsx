import {forwardRef, useState} from 'react';
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
import {
    Checkbox,
    Collapse,
    Dialog,
    IconButton,
    Slide,
    Snackbar,
    SnackbarContent,
    Tooltip,
    Typography
} from "@mui/material";
import {PeopleAlt, VisibilityOffTwoTone, VisibilityTwoTone} from "@material-ui/icons";
import {Close, Error, Room, Telegram} from "@mui/icons-material";
import {blue, green} from "@mui/material/colors";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {createNewUser} from "../../../../redux/feautures/auth";
import SetBarberLocation from "../../../Map/setBarberLocation";

const SignUpAvatar = ({classes, state}) => (
    <Tooltip title={"Выберите аватарку"}>
        <Avatar className={`${classes.avatar} ${classes.signup}`}>
            {state.avatar?.length ?
                <img src={URL.createObjectURL(state.avatar[0])} alt="Аватар" width={100} height={100} /> :
                <PeopleAlt className={classes.icon} /> }
        </Avatar>
    </Tooltip>
);

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const AsBarber = ({classes, userType, setUserType}) => {

    const dispatch = useDispatch();
    const history = useHistory();

    const {error, success, isSigningUp} = useSelector(store => store.auth);

    const { text } = useSelector((store) => store.languages);

    const [state, setState] = useState({
        name: null,
        lastname: null,
        email: null,
        login: null,
        password: null,
        telegram: "",
        avatar: null,
        location: null,
        hidePassword: true,
        statusMessageOpen: false
    })
    const [openMap, setOpenMap] = useState(false);
    const [hasTelegram, setHasTelegram] = useState(false);
    const [hasLocation, setHasLocation] = useState(false);

    const handleChangeChecked = (e) => {
        setHasTelegram(e.target.checked);
        hasTelegram && closeTelegram()
    };

    const handleSetLocation = (data) => {
        setState({...state, location: data});
        setHasLocation(true);
        console.log('killed x2')
        if (data) {
            setHasLocation(true)
            handleOpenMap()
        } else {
            setHasLocation(false)
        };
    }

    const handleChangeLocation = (e) => {
        setOpenMap(true)
        // setHasLocation(e.target.checked);
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

    const handleChange = e => {
        setState({...state,
            [e.target.name]: e.target.value
        });
    };

    const handleChangeFile = e => {
        setState({...state, [e.target.name]: e.target.files})
    }

    const showPassword = () => {
        setState({...state, hidePassword: !state.hidePassword });
    };

    const closeTelegram = () => {
        setState({...state, telegram: ""});
    }

    const submitRegistration = async (e) => {
        e.preventDefault();
        const {hidePassword, statusMessageOpen, ...newCredentials} = state;//{...state, role: userType, hidePassword: undefined, statusMessageOpen: undefined};
        newCredentials.role = userType;
        await dispatch(createNewUser(newCredentials));
        setState({...state, statusMessageOpen: true});
    };

    const handleOpenMap = () => {
        setOpenMap(!openMap)
    }

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
            </Snackbar>


            <FormControlLabel
                style={{marginRight: "-9px"}}
                control={
                    <input name="avatar" accept="image/*" className={classes.fileInput} type="file" />
                }
                label={<SignUpAvatar classes={classes} state={state} />}
                onChange={handleChangeFile}
            />

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
                    <InputLabel htmlFor="lastname" className={classes.labels}>
                        {text.lastname}
                    </InputLabel>
                    <Input
                        name="lastname"
                        type="text"
                        autoComplete="off"
                        className={classes.inputs}
                        disableUnderline
                        onChange={handleChange}
                    />
                </FormControl>

                <FormControl required fullWidth margin="normal">
                    <InputLabel htmlFor="email" className={classes.labels}>
                        {text.mail}
                    </InputLabel>
                    <Input
                        name="email"
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
                        type={state.hidePassword ? "password" : "text"}
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
                            </InputAdornment>}
                    />
                </FormControl>

                <Collapse in={hasTelegram}>
                    <FormControl fullWidth margin="normal">
                        <InputLabel htmlFor="telegram" className={classes.labels}>
                            {text.telegram}
                        </InputLabel>
                        <Input
                            value={state.telegram}
                            name="telegram"
                            type="text"
                            autoComplete="off"
                            className={classes.inputs}
                            disableUnderline
                            onChange={handleChange}
                        />
                    </FormControl>
                </Collapse>

                <FormControlLabel label={!hasTelegram && text.hasTelegram} style={{marginLeft: 0}} control={
                    <Checkbox
                        className={classes.telegramCheckbox}
                        icon={<Telegram />}
                        checkedIcon={<Telegram sx={{color: blue[500]}} />}
                        checked={hasTelegram}
                        onChange={handleChangeChecked}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />}
                />

                <Dialog
                    fullScreen
                    open={openMap}
                    onClose={handleOpenMap}
                    TransitionComponent={Transition}
                >
                    <SetBarberLocation handleCloseMap={handleOpenMap} handleSetLocation={handleSetLocation} location={state.location} />
                </Dialog>

                <FormControlLabel label={!hasLocation && text.hasLocation} style={{marginLeft: 0, width: "100%"}} control={
                    <Checkbox
                        className={classes.telegramCheckbox}
                        icon={<Room />}
                        checkedIcon={<Room sx={{color: blue[500]}} />}
                        checked={hasLocation}
                        onChange={handleChangeLocation}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />}
                />

                <div /> <br />

                <Typography
                    className={classes.haveAccount}
                    onClick={() => history.push("/login")}
                >
                    {text.signInMessage}
                </Typography>

                <Typography
                    className={classes.haveAccount}
                    onClick={() => setUserType('Client')}
                >
                   {text.iClient}
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

export default withStyles(register)(AsBarber);