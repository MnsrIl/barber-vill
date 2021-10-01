import React, {useEffect, useState} from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
import helloImage from "../../../image/avatar-hello.jpg";

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
import {useDispatch, useSelector} from "react-redux";
import {GitHub, Telegram, Camera, Palette, Favorite, Create as CreateIcon, Facebook, CreateOutlined} from "@material-ui/icons";
import {FormControl, TextField, Tooltip} from "@mui/material";
import {ArrowDownward, ArrowForward, ArrowForwardIos, BorderColor, KeyboardArrowDown, Save} from "@mui/icons-material";
import {Input, InputLabel} from "@material-ui/core";
import { updateUserData } from "../../../redux/feautures/auth";

const useStyles = styles;

const ClientProfile = (props) => {
      const person = useSelector(store => store.auth.person);
    
      const [userState, setUserState] = useState({
        name:""
      })

      useEffect(() => {
        if(person) {
          setUserState({
            ...userState, name:person.name, number: person.personal.number
          })
        }
      }, [person])

      const [changeAbleData, setChangeAbleData] = useState(true);

      const dispatch = useDispatch()

      const handleChangeAbling = () => {
        if (!changeAbleData) {
          dispatch(updateUserData({name: userState.name, number:userState.number}))
        }
        setChangeAbleData(!changeAbleData)
      }

      const handleChange = e => {
        setUserState({...userState, [e.target.name]: e.target.value})
      }

      const classes = useStyles();
      const { ...rest } = props;
      const imageClasses = classNames(classes.imgRaised, classes.imgRoundedCircle, classes.imgFluid);
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
              <div sx={{pb: 8, mb: 8}}>
                <div className={classes.container}>
                  <GridContainer justifyContent="center">
                    <GridItem xs={12} sm={12} md={6}>
                      <div className={classes.profile}>
                        <div>
                          <img src={helloImage} alt="..." className={imageClasses} style={{transform: "translate3d(0, -50%, 0)"}} />
                        </div>
                        <div className={classes.name}>
                          <h3 className={classes.title}>
                            {person?.name} {/*Имя*/}
                          </h3>

                          <h6 style={{fontSize: "0.75em", fontWeight: "600", margin: "4px 0"}}>
                            {person?.role.toUpperCase()} {/*Роль*/}
                          </h6>

                        </div>
                        <h4 className={classes.title}>
                          Ваш баланс: {person?.personal.balance}$  {/*Баланс*/}
                        </h4>
                      </div>
                    </GridItem>
                  </GridContainer>
                  <GridContainer justifyContent="center">
                    <GridItem xs={12} sm={12} md={8} className={classes.navWrapper}>
                      <NavPills
                          alignCenter
                          color="primary"
                          tabs={[
                            {
                              tabButton: "Studio",
                              tabIcon: Camera,
                              tabContent: (
                                  <GridContainer justifyContent="center">
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
                              tabButton: "Редактировать",
                              tabIcon: CreateOutlined,
                              tabContent: (
                                  <GridContainer justifyContent="center">
                                    <GridItem xs={12} sm={12} md={4}>
                                      <FormControl required fullWidth margin="normal">
                                      <InputLabel htmlFor="name" className={classes.labels}>
                                        Имя
                                      </InputLabel>
                                      <Input
                                          value={userState.name}
                                          disabled={changeAbleData}
                                          name="name"
                                          type="text"
                                          autoComplete="off"
                                          className={classes.inputs}
                                          disableUnderline={true}
                                          onChange={handleChange}
                                      />
                                      </FormControl>
                                      <FormControl required fullWidth margin="normal">
                                        <InputLabel htmlFor="number" className={classes.labels}>
                                          Номер телефона
                                        </InputLabel>
                                        <Input
                                            value={userState.number}
                                            disabled={changeAbleData}
                                            name="number"
                                            type="text"
                                            autoComplete="off"
                                            className={classes.inputs}
                                            disableUnderline={true}
                                            onChange={handleChange}
                                        />
                                      </FormControl>
                                      <Button simple color={"facebook"} onClick={handleChangeAbling}>
                                        {changeAbleData ?
                                            <>Изменить данные <CreateIcon/> </>
                                            :
                                            <>Сохранить изменения <Save/> </>
                                        }
                                      </Button>
                                    </GridItem>
                                  </GridContainer>
                              ),
                            },
                            {
                              tabButton: "Favorite",
                              tabIcon: Favorite,
                              tabContent: (
                                  <GridContainer justifyContent="center">
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
            {/*Here's could be your FOOTER*/}
            {/*<Footer />*/}
          </div>
  );
}

export default ClientProfile;