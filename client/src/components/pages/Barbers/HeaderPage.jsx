import React from 'react';
import { Home } from "@mui/icons-material";
import { List, ListItem, Tooltip } from "@material-ui/core";
import { Link } from "react-router-dom";
import styles from "../MyProfile/CustomComponents/Header/headerLinksStyle";
import Header from "../MyProfile/CustomComponents/Header/Header";
import Parallax from "../MyProfile/CustomComponents/Parallax/Parallax";

const useStyles = styles;

export default function HeaderPage(props) {
  
    const { ...rest } = props;

    return (
      <>
      <Header
      color="transparent"
      brand="Мой профиль"
      rightLinks={<NavBar />}
      fixed
      changeColorOnScroll={{ height: 200, color: "white" }}
      {...rest}
    />
    <Parallax small filter
      image={require("../../../image/profile-bg.jpg").default}
    />
</>
    );
}

export function NavBar(props) {
 const classes = useStyles();
 
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
        </List>
    
  );
}

 