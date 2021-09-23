import { Grid, IconButton, makeStyles, Tooltip } from "@material-ui/core";
import { Box } from "@mui/system";
import React from "react";
import profileIcon from "../../image/icons-login.png";
import GitHubIcon from "@material-ui/icons/GitHub";
import {useHistory} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  iconProfile: {
    width: 45,
    height: 45,
  },
  headerMain: {
    display: "flex",
    height: 52,
    margin: "30px 150px",
    alignItems: "center",
  },
  headerInfo: {
    display: "flex",
    flex: "1",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));

function Header() {
  const classes = useStyles();
  const history = useHistory();
  return (
    <Grid xs={12}>
      <Box className={classes.headerMain}>
        <Grid item xs={12} sm={3}>
          logo
        </Grid>
        <Box className={classes.headerInfo}>
          <Box style={{ cursor: "pointer" }} onClick={() => history.push("/")}>
            Главная
          </Box>
          <Box>Парикмахеры </Box>
          <Box>О сервисе </Box>
          <Box>
            <a href={"https://github.com/TheZiggie/barber-vill"}>
              <GitHubIcon htmlColor={"#362e2e"} />
            </a>
          </Box>
        </Box>
        <Grid item xs={12} sm={3}>
          <Box textAlign="center">
            <Tooltip title={"Мой профиль"}>
              <IconButton onClick={() => history.push("/signup")}>
                <img
                  src={profileIcon}
                  alt="profile"
                  className={classes.iconProfile}
                />
              </IconButton>
            </Tooltip>
          </Box>
        </Grid>
      </Box>
    </Grid>
  );
}

export default Header;
