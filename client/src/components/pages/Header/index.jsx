import {
  Divider,
  Drawer,
  IconButton,
  List,
  makeStyles,
  Toolbar,
} from "@material-ui/core";
import {
  Box,
  Collapse,
  CssBaseline,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Select,
} from "@mui/material";
import profileIcon from "../../../image/profile.png";
import { NavLink, useHistory } from "react-router-dom";
import ProfileIcon from "./ProfileIcon";
import {
  GTranslate as GTranslateIcon,
  Home as HomeIcon,
  Info as InfoIcon,
  People as PeopleIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";
import React from "react";
import { styled } from "@material-ui/styles";
import CloseIcon from '@mui/icons-material/Close';

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
  iconMenu:{
      
  },
  listitem:{
    backgroundColor:'rgba(0,0,0,20)'
  }
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: "0 8px",
  justifyContent: "flex-end",
}));

function Header() {
  const classes = useStyles();
  const history = useHistory();

  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

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

        <ProfileIcon />

        <Box className={classes.iconMenu}>
          <CssBaseline />
          <Toolbar>
            <IconButton
              color="secondary"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: "none" }) }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
          <Drawer
            // sx={{
            //   width: "24px",
            //   flexShrink: 0,
            //   "& .MuiDrawer-paper": {
            //     width: "240px",
            //     boxSizing: "border-box",
            //   },
            //   "& .MuiPaper-root": {
            //       backgroundColor: "red"
            //   }
            // }}
            variant="persistent"
            anchor="right"
            open={open}
            className = {classes.listitem}
          >
            <DrawerHeader>
              <IconButton onClick={handleDrawerClose}><CloseIcon/></IconButton>
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
          </Drawer>
        </Box>
      </Box>
    </Box>
  );
}

export default Header;
