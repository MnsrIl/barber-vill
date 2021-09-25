import {Grid, IconButton, List, makeStyles, Tooltip} from "@material-ui/core";
import {Box, Collapse, ListItemButton, ListItemIcon, ListItemText, Select} from "@mui/material";
import profileIcon from "../../../image/profile.png";
import GitHubIcon from "@material-ui/icons/GitHub";
import {NavLink, useHistory} from "react-router-dom";
import ProfileIcon from "./ProfileIcon";
import {
    GTranslate as GTranslateIcon,
    Home as HomeIcon, Info as InfoIcon,
    People as PeopleIcon,
    Reorder as ReorderIcon
} from "@mui/icons-material";
import {useState} from "react";

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
}));

function Header() {
    const classes = useStyles();
    const history = useHistory();

    const [open, setOpen] = useState(true);

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
                                    to="/hairstyles"
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
