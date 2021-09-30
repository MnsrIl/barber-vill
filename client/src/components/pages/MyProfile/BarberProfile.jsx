import React, {useEffect, useState} from "react";
// nodejs library that concatenates classes
import classNames from "classnames";

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

import avatarImage from "../../../image/avatar-hello.jpg"

import work1 from "../../../image/olu-eletu.jpg";
import work2 from "../../../image/clem-onojeghuo.jpg";
import work3 from "../../../image/cynthia-del-rio.jpg";
import work4 from "../../../image/mariya-georgieva.jpg";
import work5 from "../../../image/clem-onojegaw.jpg";

import styles from "./CustomProfileStyles";
import {useDispatch, useSelector} from "react-redux";
import {Input, InputLabel, Tooltip} from "@material-ui/core"
import {GitHub, Telegram, Camera, Palette, Favorite, Create as CreateIcon, Facebook} from "@material-ui/icons";
import {FormControl, FormControlLabel, TextField} from "@mui/material";
import {ArrowDownward, ArrowForward, ArrowForwardIos, Email, KeyboardArrowDown, Save} from "@mui/icons-material";
import UpdateAvatar from "./Barber/UpdateAvatar";
import {updateUserData} from "../../../redux/feautures/auth";


const useStyles = styles;

const BarberProfile = (props) => {
    const person = useSelector(store => store.auth.person);

    const [changeAble, setChangeAble] = useState(false);
    const [state, setState] = useState({
      email: "",
      telegram: "",
      lastname: "",
      name: "",
    });

    useEffect(() => {
      const {name, personal: {lastname, telegram, email}} = person;
      if (person) {
        setState({name, lastname, telegram, email});
      }
    }, [person]);

    const handleChangeState = e => {
      setState({...state,
        [e.target.name]: e.target.value
      });
    }

    let aboutMyself = "Let me introduce myself. My name is Ann. I am twenty. I am a student.\n" +
        "                                I study at the university. I am a prospective economist. I like this profession,\n" +
        "                                that’s why I study with pleasure. My parents are not economists,\n" +
        "                                but they support me in my choice. We are a friendly family and try to understand\n" +
        "                                and support each other in any situation. Understanding and support is\n" +
        "                                what I need in friendship as well. Some of my friends study at the same university.\n" +
        "                                After classes we usually gather to­gether, discuss our plans or problems and\n" +
        "                                have some fun. We have a lot of hobbies..";

    const [mySelfText, setMySelfText] = useState(aboutMyself);

    const handleChange = () => setChangeAble(!changeAble);
    const handleText = (e) => setMySelfText(e.target.value);
    const [changeAbleData, setChangeAbleData] = useState(true);

    const dispatch = useDispatch()
    const handleChangeAbling = () => {
      if (!changeAbleData) {
        dispatch(updateUserData({email: state.email, name: state.name, lastname: state.lastname, telegram: state.telegram}));
      }
      setChangeAbleData(!changeAbleData)
    };

    const classes = useStyles();
    const { ...rest } = props;
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
                <GridContainer justifyContent="center">
                  <GridItem xs={12} sm={12} md={6}>
                    <div className={classes.profile}>
                      <div>
                        <UpdateAvatar person={person} useStyles={useStyles} />
                      </div>
                      <div className={classes.name}>
                        <h3 className={classes.title}>
                          {person?.name} {(person?.personal?.lastname)} {/*Имя*/}
                        </h3>
                        <h6 style={{fontSize: "0.75em", fontWeight: "600", margin: "4px 0"}}>
                          {person?.personal.email && /*Отображение почты, если она есть*/
                              <Tooltip placement={"left"} title={person.personal.email}>
                                <Button justIcon link className={classes.margin5}>
                                  <Email href={`https://mail.ru/${person.personal.email}`}/>
                                </Button>
                              </Tooltip>}

                          {person?.role.toUpperCase()} {/*Роль*/}

                          {person?.personal.telegram && /*Оторабрежние телеграмма, если он есть*/
                            <Tooltip placement={"right"} title={person.personal.telegram}>
                              <Button justIcon link className={classes.margin5}>
                                <Telegram href={`https://t.me/${person.personal.telegram}`}/>
                              </Button>
                            </Tooltip>}
                        </h6>

                      </div>
                    </div>
                  </GridItem>
                </GridContainer>
                <div className={classes.description}>
                  {changeAble ? <>
                        <TextField
                            id="outlined-multiline-static"
                            multiline
                            rows={10}
                            aria-colspan={15}
                            placeholder={mySelfText}
                            value={mySelfText}
                            onChange={handleText}
                            variant="outlined"
                        />
                        <Button justIcon className={classes.margin5} onClick={handleChange}>
                          <Save />
                        </Button>
                      </>
                      :
                      <>
                        {mySelfText ? <p>{mySelfText}</p> :
                            <p>
                              У вас, к сожалению, нет описания
                              <br />
                              Давайте исправим это!
                              <br />
                              <ArrowDownward sx={{mt: 3}} />
                            </p>}
                        <Tooltip title={"Добавить описание"}>
                          <Button justIcon className={classes.margin5} onClick={handleChange}>
                            <CreateIcon />
                          </Button>
                        </Tooltip>
                      </>
                  }


                </div>
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
                            tabButton: "Work",
                            tabIcon: Palette,
                            tabContent: (
                                <GridContainer justifyContent="center">
                                  <GridItem xs={12} sm={12} md={4}>
                                    <FormControl required fullWidth margin="normal">
                                      <InputLabel className={classes.labels}>
                                        Имя
                                      </InputLabel>
                                      <Input
                                          value={state.name}
                                          disabled={changeAbleData}
                                          name="number"
                                          type="text"
                                          autoComplete="off"
                                          className={classes.inputs}
                                          disableUnderline={true}
                                          onChange={handleChangeState}
                                      />
                                    </FormControl>
                                    <FormControl required fullWidth margin="normal">
                                      <InputLabel className={classes.labels}>
                                        Фамилия
                                      </InputLabel>
                                      <Input
                                          value={state.lastname}
                                          disabled={changeAbleData}
                                          name="lastname"
                                          type="text"
                                          autoComplete="off"
                                          className={classes.inputs}
                                          disableUnderline={true}
                                          onChange={handleChangeState}
                                      />
                                    </FormControl>
                                    <FormControl required fullWidth margin="normal">
                                      <InputLabel className={classes.labels}>
                                        Почта
                                      </InputLabel>
                                      <Input
                                          value={state.email}
                                          disabled={changeAbleData}
                                          name="email"
                                          type="text"
                                          autoComplete="off"
                                          className={classes.inputs}
                                          disableUnderline={true}
                                          onChange={handleChangeState}
                                      />
                                    </FormControl>
                                    <FormControl required fullWidth margin="normal">
                                      <InputLabel className={classes.labels}>
                                        Телеграмм
                                      </InputLabel>
                                      <Input
                                          value={state.telegram}
                                          disabled={changeAbleData}
                                          name="telegram"
                                          type="text"
                                          autoComplete="off"
                                          className={classes.inputs}
                                          disableUnderline={true}
                                          onChange={handleChangeState}
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

export default BarberProfile;