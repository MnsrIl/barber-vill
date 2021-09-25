import React from "react";
import { Box } from "@mui/system";
import { IconButton, List, makeStyles, Tooltip } from "@material-ui/core";
import profileIcon from "../../image/icons-login.png";
import { NavLink, useHistory } from "react-router-dom";
import {
  Collapse,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Select,
} from "@mui/material";
import {
  Home as HomeIcon,
  People as PeopleIcon,
  Reorder as ReorderIcon,
  Info as InfoIcon,
  GTranslate as GTranslateIcon,
} from "@mui/icons-material";

const useStyles = makeStyles((theme) => ({
  iconProfile: {
    width: 45,
    height: 45,
  },
  headerMain: {
    display: "flex",
    height: 50,
    padding: "20px 100px",
    alignItems: "center",
    justifyContent: "space-between",
  },
  listIcon: {
    width: 40,
    height: 40,
    border: "2px solid white",
  },
  iconsMenu: {
    display: "flex",
    textDecoration: "none",
  },
}));

function Header() {
  const classes = useStyles();
  const history = useHistory();

  const [open, setOpen] = React.useState(true);

  return (
    <Box className={classes.headerMain}>
      <Box>logo</Box>
      <Box
        width="120px"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Select IconComponent={GTranslateIcon} className={classes.listIcon}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <NavLink
                  to=""
                  style={{ textDecoration: "none" }}
                  activeStyle={{ color: "red", fontWeight: "bold" }}
                >
                  <ListItemText primary="Русский" />
                </NavLink>
              </ListItemButton>

              <ListItemButton sx={{ pl: 4 }}>
                <NavLink
                  to=""
                  style={{ textDecoration: "none" }}
                  activeStyle={{ color: "red", fontWeight: "bold" }}
                >
                  <ListItemText primary="English" />
                </NavLink>
              </ListItemButton>
            </List>
          </Collapse>
        </Select>

        <Tooltip title={"Мой профиль"}>
          <IconButton onClick={() => history.push("/signup")}>
            <img
              src={profileIcon}
              alt="profile"
              className={classes.iconProfile}
            />
          </IconButton>
        </Tooltip>

        <Select IconComponent={ReorderIcon} className={classes.listIcon}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <NavLink
                  exact
                  to="/"
                  className={classes.iconsMenu}
                  activeStyle={{ color: "red", fontWeight: "bold" }}
                >
                  <ListItemIcon>
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText primary="Главная" />
                </NavLink>
              </ListItemButton>

              <ListItemButton sx={{ pl: 4 }}>
                <NavLink
                  exact
                  to="/barbers"
                  className={classes.iconsMenu}
                  activeStyle={{ color: "red", fontWeight: "bold" }}
                >
                  <ListItemIcon>
                    <PeopleIcon />
                  </ListItemIcon>
                  <ListItemText primary="Парикмахеры" />
                </NavLink>
              </ListItemButton>

              <ListItemButton sx={{ pl: 4 }}>
                <NavLink
                  exact
                  to="/beards"
                  className={classes.iconsMenu}
                  activeStyle={{ color: "red", fontWeight: "bold" }}
                >
                  <ListItemIcon>
                    <InfoIcon />
                  </ListItemIcon>
                  <ListItemText primary="О сервисе" />
                </NavLink>
              </ListItemButton>
            </List>
          </Collapse>
        </Select>
      </Box>
    </Box>
  );
}

export default Header;
