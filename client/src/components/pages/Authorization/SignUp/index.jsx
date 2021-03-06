import {useState} from "react";
import {Paper, withStyles} from "@material-ui/core";
import { register } from "../RegistrationStyles";
import AsClient from "./AsClient";
import AsBarber from "./AsBarber";
import MainMenu from "./MainMenu";

const SignUp = (props) =>  {
    const [userState, setUserState] = useState("");

    const { classes } = props;

    return (
        <div className={classes.main}>
            <Paper className={classes.paper}>
                {
                    (userState === 'Client') ? <AsClient userType={userState} setUserType={setUserState} /> :
                        (userState === 'Barber') ? <AsBarber userType={userState} setUserType={setUserState} /> :
                            <MainMenu setUserState={setUserState} />
                }
            </Paper>
        </div>
    );
}

export default withStyles(register)(SignUp);