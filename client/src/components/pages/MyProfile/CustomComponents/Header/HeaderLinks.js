import {ExitToApp, AccountBalanceWallet as CashIcon, Apps, Home, Delete as DeleteIcon} from "@mui/icons-material";
import { List, ListItem, Tooltip } from "@material-ui/core";
import { Link } from "react-router-dom";
import CustomDropdown from "../CustomDropdown/CustomDropdown.js";

import styles from "./headerLinksStyle.js";
import {useDispatch} from "react-redux";

const useStyles = styles;


export default function HeaderLinks(props) {

    const classes = useStyles();
    const dispatch = useDispatch();

    const handleLogOut = () => {
      dispatch({type: "auth/logout"});
    }

    return (
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
                  dropdownList={[
                      <Link to="/" className={classes.dropdownLink}>
                          <CashIcon color={"success"} sx={{mr: "5px"}} />
                          Пополнить баланс
                      </Link>,
                      <Link to="/" className={classes.dropdownLink}>
                          <DeleteIcon color={"error"} />
                          Удалить аккаунт
                      </Link>,
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
    );
}
