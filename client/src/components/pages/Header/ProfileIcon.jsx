import {Avatar, IconButton, MenuItem, Divider, ListItemIcon, Menu, Tooltip, } from '@mui/material';
import profileIcon from "../../../image/profile.png";
import {useState} from "react";
import {ManageAccounts, Logout, VpnKey, LockOpen, Security, FaceRetouchingNatural} from "@mui/icons-material";
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

const ProfileIcon = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const {isLoggedIn, person} = useSelector(store => store.auth);

    const { text } = useSelector((store) => store.languages);

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const sendToAddress = (address) => history.push(address);

    const handleSignOut = () => {
        dispatch({type: "auth/logout"})
        handleClose()
    }

    return (
        <>
            <Tooltip title={text.myProfile}>
                <IconButton onClick={handleClick} size="small" sx={{ p: 0, ml: 2, color: '#fff' }}>
                    <img
                        src={profileIcon}
                        alt="profile"
                    />
                </IconButton>
            </Tooltip>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 15,
                            width: 10,
                            height: 10,
                            backgroundColor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                {isLoggedIn ?
                    <>
                        <MenuItem>
                            {text.role} {person?.role}
                        </MenuItem>
                        <MenuItem>
                            <ListItemIcon>
                                {person?.role === 'Barber' ? <Avatar src={person.personal?.avatar} /> :
                                    <FaceRetouchingNatural />}
                            </ListItemIcon>
                            {person? `${text.name} ${(person.name || person.login)}` : null}
                        </MenuItem>
                        <MenuItem onClick={() => sendToAddress("/profile")}>
                            <ListItemIcon>
                                <ManageAccounts fontSize="medium" />
                            </ListItemIcon>
                            {text.profile}
                        </MenuItem>
                        <Divider />
                        <MenuItem onClick={handleSignOut}>
                            <ListItemIcon>
                            <Logout fontSize="small" />
                            </ListItemIcon>
                            {text.logOut}
                        </MenuItem>
                    </>
                :
                    <>
                        <MenuItem onClick={() => sendToAddress("/login")}>
                            <ListItemIcon>
                                <VpnKey fontSize="medium" />
                            </ListItemIcon>
                            {text.LogIn}
                        </MenuItem>
                        <MenuItem onClick={() => sendToAddress("/signup")}>
                            <ListItemIcon>
                                <LockOpen fontSize="small" />
                            </ListItemIcon>
                            {text.SignUp}
                        </MenuItem>
                    </>
                }
            </Menu>
        </>
    );
}

export default ProfileIcon;