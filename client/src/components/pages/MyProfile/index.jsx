import {Box, Paper, Typography} from "@mui/material";
import {useSelector} from "react-redux";

const MyProfile = () => {
    const person = useSelector(store => store.auth.person);

    return (
        <Box display={"flex"} pt={3} justifyContent={"center"}>
            <Paper elevation={3}>
                <Box flex justifyContent="center">
                    <Typography variant="h2" component="div">
                        Это мой профиль!
                    </Typography>
                    MyName: {person?.name}

                    <p>Мой баланс: {person?.personal.balance}</p>
                    <p>Роль: {person?.role}</p>
                </Box>
            </Paper>
        </Box>
    );
};
export default MyProfile;
