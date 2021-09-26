import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Camera from "@material-ui/icons/Camera";
import Palette from "@material-ui/icons/Palette";
import Favorite from "@material-ui/icons/Favorite";
import {Create as CreateIcon} from '@mui/icons-material';
// core components
import Header from "./CustomComponents/Header/Header.js";
import Footer from "./CustomComponents/Footer/Footer.js";
import Button from "./CustomComponents/CustomButtons/Button.js";
import GridContainer from "./CustomComponents/Grid/GridContainer.js";
import GridItem from "./CustomComponents/Grid/GridItem.js";
import HeaderLinks from "./CustomComponents/Header/HeaderLinks.js";
import NavPills from "./CustomComponents/NavPills/NavPills.js";
import Parallax from "./CustomComponents/Parallax/Parallax.js";

import profile from "../../../image/christian.jpg";

import studio1 from "../../../image/studio-1.jpg";
import studio2 from "../../../image/studio-2.jpg";
import studio3 from "../../../image/studio-3.jpg";
import studio4 from "../../../image/studio-4.jpg";
import studio5 from "../../../image/studio-5.jpg";
import work1 from "../../../image/olu-eletu.jpg";
import work2 from "../../../image/clem-onojeghuo.jpg";
import work3 from "../../../image/cynthia-del-rio.jpg";
import work4 from "../../../image/mariya-georgieva.jpg";
import work5 from "../../../image/clem-onojegaw.jpg";

import styles from "./CustomProfileStyles";
import {useSelector} from "react-redux";
import {GitHub, Telegram, Twitter} from "@mui/icons-material";

const useStyles = makeStyles(styles);

export default function ProfilePage(props) {
    const person = useSelector(store => store.auth.person);
    const classes = useStyles();
    const { ...rest } = props;
    const imageClasses = classNames(
        classes.imgRaised,
        classes.imgRoundedCircle,
        classes.imgFluid
    );
    const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);
    return (
        <div>
            <Header
                color="transparent"
                brand="Мой профиль"
                rightLinks={<HeaderLinks />}
                fixed
                changeColorOnScroll={{
                    height: 200,
                    color: "white",
                }}
                {...rest}
            />
            <Parallax
                small
                filter
                image={require("../../../image/profile-bg.jpg").default}
            />
            <div className={classNames(classes.main, classes.mainRaised)}>
                <div>
                    <div className={classes.container}>
                        <GridContainer justify="center">
                            <GridItem xs={12} sm={12} md={6}>
                                <div className={classes.profile}>
                                    <div>
                                        <img src={profile} alt="..." className={imageClasses} />
                                    </div>
                                    <div className={classes.name}>
                                        <h3 className={classes.title}>{person.name}</h3>
                                        <h6>{person.role.toUpperCase()}</h6>
                                        <Button justIcon link className={classes.margin5}>
                                            <Telegram />
                                        </Button>
                                        <Button justIcon link className={classes.margin5}>
                                            <GitHub />
                                        </Button>
                                        <Button justIcon link className={classes.margin5}>
                                            <i className={"fab fa-facebook"} />
                                        </Button>
                                    </div>
                                </div>
                            </GridItem>
                        </GridContainer>
                        <div className={classes.description}>
                            <p>
                                Let me introduce myself. My name is Ann. I am twenty. I am a student.
                                I study at the university. I am a prospective economist. I like this profession,
                                that’s why I study with pleasure. My parents are not economists,
                                but they support me in my choice. We are a friendly family and try to understand
                                and support each other in any situation. Understanding and support is
                                what I need in friendship as well. Some of my friends study at the same university.
                                After classes we usually gather to­gether, discuss our plans or problems and
                                have some fun. We have a lot of hobbies..{" "}
                            </p>
                            <Button justIcon link className={classes.margin5}>
                                <CreateIcon />
                            </Button>
                        </div>
                        <GridContainer justify="center">
                            <GridItem xs={12} sm={12} md={8} className={classes.navWrapper}>
                                <NavPills
                                    alignCenter
                                    color="primary"
                                    tabs={[
                                        {
                                            tabButton: "Studio",
                                            tabIcon: Camera,
                                            tabContent: (
                                                <GridContainer justify="center">
                                                    <GridItem xs={12} sm={12} md={4}>
                                                        <img
                                                            alt="..."
                                                            src={studio1}
                                                            className={navImageClasses}
                                                        />
                                                        <img
                                                            alt="..."
                                                            src={studio2}
                                                            className={navImageClasses}
                                                        />
                                                    </GridItem>
                                                    <GridItem xs={12} sm={12} md={4}>
                                                        <img
                                                            alt="..."
                                                            src={studio5}
                                                            className={navImageClasses}
                                                        />
                                                        <img
                                                            alt="..."
                                                            src={studio4}
                                                            className={navImageClasses}
                                                        />
                                                    </GridItem>
                                                </GridContainer>
                                            ),
                                        },
                                        {
                                            tabButton: "Work",
                                            tabIcon: Palette,
                                            tabContent: (
                                                <GridContainer justify="center">
                                                    <GridItem xs={12} sm={12} md={4}>
                                                        <img
                                                            alt="..."
                                                            src={work1}
                                                            className={navImageClasses}
                                                        />
                                                        <img
                                                            alt="..."
                                                            src={work2}
                                                            className={navImageClasses}
                                                        />
                                                        <img
                                                            alt="..."
                                                            src={work3}
                                                            className={navImageClasses}
                                                        />
                                                    </GridItem>
                                                    <GridItem xs={12} sm={12} md={4}>
                                                        <img
                                                            alt="..."
                                                            src={work4}
                                                            className={navImageClasses}
                                                        />
                                                        <img
                                                            alt="..."
                                                            src={work5}
                                                            className={navImageClasses}
                                                        />
                                                    </GridItem>
                                                </GridContainer>
                                            ),
                                        },
                                        {
                                            tabButton: "Favorite",
                                            tabIcon: Favorite,
                                            tabContent: (
                                                <GridContainer justify="center">
                                                    <GridItem xs={12} sm={12} md={4}>
                                                        <img
                                                            alt="..."
                                                            src={work4}
                                                            className={navImageClasses}
                                                        />
                                                        <img
                                                            alt="..."
                                                            src={studio3}
                                                            className={navImageClasses}
                                                        />
                                                    </GridItem>
                                                    <GridItem xs={12} sm={12} md={4}>
                                                        <img
                                                            alt="..."
                                                            src={work2}
                                                            className={navImageClasses}
                                                        />
                                                        <img
                                                            alt="..."
                                                            src={work1}
                                                            className={navImageClasses}
                                                        />
                                                        <img
                                                            alt="..."
                                                            src={studio1}
                                                            className={navImageClasses}
                                                        />
                                                    </GridItem>
                                                </GridContainer>
                                            ),
                                        },
                                    ]}
                                />
                            </GridItem>
                        </GridContainer>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
