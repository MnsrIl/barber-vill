import React from "react";
import {
  Divider,
  Drawer,
  IconButton,
  List,
  makeStyles,
  Menu,
  MenuItem,
  Toolbar,
} from "@material-ui/core";
import { Box, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { styled } from "@material-ui/styles";
import { NavLink } from "react-router-dom";
import ProfileIcon from "./ProfileIcon";
import {
  GTranslate as GTranslateIcon,
  Home as HomeIcon,
  Info as InfoIcon,
  People as PeopleIcon,
  Menu as MenuIcon,
  Close as CloseIcon,
} from "@mui/icons-material";

const useStyles = makeStyles((theme) => ({
  headerInfo: {
    display: "flex",
    flex: "1",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconProfile: {
    width: 45,
    height: 45,
  },
  headerMain: {
    display: "flex",
    // height: 40,
    padding: "6px 61px",
    alignItems: "center",
    justifyContent: "space-between",
    // borderBottom: "1px solid grey",
  },
  iconsMenu: {
    display: "flex",
    textDecoration: "none",
    color: "white",
  },
  theNameOfTheStyleClass: {
    backgroundColor: "rgba(20,20,20,0.9)",
  },
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  paddingTop: 8,
  paddingLeft: 90,
}));

function Header() {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const openLanguage = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box className={classes.headerMain}>
      <Box color="white">logo</Box>
      <Box
        width="120px"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <ProfileIcon />

        <Box className={classes.iconMenu}>
          <Toolbar>
            <IconButton
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: "none" }) }}
              style={{
                border: "2px solid white",
                borderRadius: "50%",
                color: "white",
              }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>

          <Drawer
            classes={{ paper: classes.theNameOfTheStyleClass }}
            variant="persistent"
            anchor="right"
            open={open}
            style={{ position: "relative" }}
          >
            <DrawerHeader>
              <IconButton onClick={handleDrawerClose}>
                <CloseIcon
                  fontSize="large"
                  style={{
                    color: "red",
                    border: "2px solid white",
                    borderRadius: "50%",
                  }}
                />
              </IconButton>
            </DrawerHeader>
            <Divider />

            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <NavLink
                  exact
                  to="/"
                  className={classes.iconsMenu}
                  activeStyle={{ color: "red", fontWeight: "bold" }}
                >
                  <ListItemIcon>
                    <HomeIcon style={{ color: "white" }} />
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
                    <PeopleIcon style={{ color: "white" }} />
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
                    <InfoIcon style={{ color: "white" }} />
                  </ListItemIcon>
                  <ListItemText primary="О сервисе" />
                </NavLink>
              </ListItemButton>
            </List>
            <List
              component="div"
              disablePadding
              style={{ position: "absolute", bottom: 0, height: "70px" }}
            >
              <ListItemButton
                sx={{ pl: 4, color: "white" }}
                id="basic-button"
                aria-controls="basic-menu"
                aria-haspopup="true"
                aria-expanded={openLanguage ? "true" : undefined}
                onClick={handleClick}
              >
                <ListItemIcon>
                  <GTranslateIcon style={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText primary=" Язык" />
              </ListItemButton>

              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={openLanguage}
                onClose={handleClose}
                style={{ marginTop: "-50px", marginLeft: "35px" }}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={handleClose}>
                  <NavLink
                    to=""
                    style={{ textDecoration: "none", padding: "0 12px" }}
                    activeStyle={{ color: "red", fontWeight: "bold" }}
                  >
                    <ListItemText primary="English" />
                  </NavLink>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <NavLink
                    to=""
                    style={{ textDecoration: "none", padding: "0 12px" }}
                    activeStyle={{ color: "red", fontWeight: "bold" }}
                  >
                    <ListItemText primary="Русский" />
                  </NavLink>
                </MenuItem>
              </Menu>
            </List>
          </Drawer>
        </Box>
      </Box>
    </Box>
  );
}

export default Header;
