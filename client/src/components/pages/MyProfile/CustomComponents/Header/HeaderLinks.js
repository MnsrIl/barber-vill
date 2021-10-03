import { Link } from "react-router-dom";
import { useState } from "react";
import { Button, List, ListItem, Tooltip } from "@material-ui/core";
import {ExitToApp, AccountBalanceWallet as CashIcon, Apps, Home, Delete as DeleteIcon} from "@mui/icons-material";
import CustomDropdown from "../CustomDropdown/CustomDropdown.js";
import styles from "./headerLinksStyle.js";
import {useDispatch, useSelector} from "react-redux";
import { deleteAccount } from "../../../../../redux/feautures/auth.js";
import Balance from "../../../Balance.jsx";

const useStyles = styles;

export default function HeaderLinks(props) {

    const classes = useStyles();
    const dispatch = useDispatch();
    const person = useSelector(store => store.auth.person)

    const handleLogOut = () => {
      dispatch({type: "auth/logout"});
    }

    const handleDelete = () => {
        dispatch(deleteAccount())
    }

    const [modalOpen, setModalOpen] = useState(false);
    const handleOpen = () => { setModalOpen(!modalOpen) };
    const handleClose = () => setModalOpen(false);

    return (
        <>
        <Balance modalOpen={modalOpen} handleClose={handleClose} />
        <List className={classes.list}>
          <ListItem className={classes.listItem}>
            <Tooltip
                title="Главная"
                placement={window.innerWidth > 959 ? "top" : "left"}
                classes={{ tooltip: classes.tooltip }}
            >
              <Link
                  color="transparent"
                  to={"/"}
                  className={classes.navLink}
              >
                <Home className={classes.socialIcons} />
              </Link>
            </Tooltip>
          </ListItem>
          <ListItem className={classes.listItem}>
              <CustomDropdown
                  noLiPadding
                  buttonText="Возможности"
                  buttonProps={{
                      className: classes.navLink,
                      color: "transparent",
                  }}
                  buttonIcon={Apps}
                  dropdownList={person?.role === "Client" ? [
                    <Button className={classes.dropdownLink} onClick={handleOpen}>
                        <CashIcon color={"success"} sx={{mr: "5px"}} />
                            Пополнить баланс
                    </Button>,
                      <Link to="/" onClick = {handleDelete}
                      className={classes.dropdownLink}>
                          <DeleteIcon color={"error"} />
                          Удалить аккаунт
                      </Link>,
                  ] : [
                    <Link to="/" onClick = {handleDelete} className={classes.dropdownLink}>
                      <DeleteIcon color={"error"} />
                      Удалить аккаунт
                    </Link>
                  ]}
              />
          </ListItem>

          <ListItem className={classes.listItem} style={{marginLeft: "30px"}} onClick={handleLogOut} >
              <Tooltip
                  title="Выйти"
                  placement={window.innerWidth > 959 ? "top" : "left"}
                  classes={{ tooltip: classes.tooltip }}
              >
                  <Link
                      to="/"
                      color="transparent"
                      className={classes.navLink}
                  >
                      <ExitToApp className={classes.socialIcons} />
                  </Link>
              </Tooltip>
          </ListItem>
        </List>
        </>
    );
}
