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
import {Box, Input, InputLabel, Tooltip, Typography} from "@material-ui/core"
import {GitHub, Telegram, Camera, Palette, Favorite, Create as CreateIcon, Facebook} from "@material-ui/icons";
import {FormControl, FormControlLabel, Snackbar, TextField} from "@mui/material";
import {
    ArrowDownward,
    ArrowForward,
    ArrowForwardIos,
    Email,
    Error,
    KeyboardArrowDown,
    Map,
    Save
} from "@mui/icons-material";
import UpdateAvatar from "./Barber/UpdateAvatar";
import {addDescription, updateUserData} from "../../../redux/feautures/auth";
import BarberProfileMap from "../../Map/BarberProfileMap";


const useStyles = styles;

const correctTime = (time) =>
    `${new Date(time).toLocaleDateString()}_${new Date(time)
        .toTimeString()
        .slice(0, 9)}`;

const BarberProfile = (props) => {
    const person = useSelector(store => store.auth.person);
    const success = useSelector(store => store.auth.success);
    const error = useSelector(store => store.auth.error);
    const userLoading = useSelector(store => store.auth.userLoading);
    const desc = useSelector(store => store.auth.personal?.desc);

    const [changeAble, setChangeAble] = useState(false);
    const [state, setState] = useState({
      email: "",
      telegram: "",
      lastname: "",
      name: "",
    });

    useEffect(() => {
      const {name, personal: {lastname, telegram, email, desc}} = person;
      if (person) {
        setState({name, lastname, telegram, email});
        setDescription(desc)
      }
    }, [person]);

    const handleChangeState = e => {
      setState({...state,
        [e.target.name]: e.target.value
      });
    }

    const [description, setDescription] = useState("");

    const handleChange = () => {
        setChangeAble(true)
    };

    const handleSaveDesc = async () => {
        await dispatch(addDescription(description))
        setChangeAble(false)
    };
    const handleText = (e) => setDescription(e.target.value);

    const [changeAbleData, setChangeAbleData] = useState(true);

    const dispatch = useDispatch()
    const handleChangeAbling = async () => {
      if (!changeAbleData) {
        await dispatch(updateUserData({email: state.email, name: state.name, lastname: state.lastname, telegram: state.telegram}));
      }
      setChangeAbleData(!changeAbleData)
    };

    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false)
        dispatch({type: "auth/dataClear"})
    }

    useEffect(() => {
        if (success || error) {
            setOpen(true)
        }
    }, [success, error])

    const classes = useStyles();
    const { ...rest } = props;
    const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);


    return (
        <>
            <Snackbar
                open={open}
                autoHideDuration={3000}
                variant={error ? "error" : "success"}
                onClose={handleClose}
                message={
                    <div>
              <span style={{ marginRight: "8px" }}>
                <Error fontSize="large" color={error ? "error" : "success"} />
              </span>
                        <span> {error?.toString() || success?.toString()} </span>
                    </div>
                }
            />

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
            { userLoading ? <div>Идёт загрузка...</div> :

            <div className={classNames(classes.main, classes.mainRaised)}>
                <div>
                    <div className={classes.container}>
                        <GridContainer justifyContent="center">
                            <GridItem xs={12} sm={12} md={6}>
                                <div className={classes.profile}>
                                    <div>
                                        <UpdateAvatar person={person} useStyles={useStyles}/>
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

                                        <h4 className={classes.title}>
                                            Ваш баланс: {person?.personal.balance}$  {/*Баланс*/}
                                        </h4>

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
                                        placeholder={desc}
                                        value={description}
                                        onChange={handleText}
                                        variant="outlined"
                                    />
                                    <Button justIcon color={"success"} className={classes.margin5} onClick={handleSaveDesc}>
                                        <Save/>
                                    </Button>
                                </>
                                :
                                <>
                                    {description ? <p>{description}</p> :
                                        <p>
                                            У вас, к сожалению, нет описания
                                            <br/>
                                            Давайте исправим это!
                                            <br/>
                                            <ArrowDownward sx={{mt: 3}}/>
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
                                            tabButton: "Location",
                                            tabIcon: Map,
                                            tabContent: (
                                                <GridContainer justifyContent="center" >

                                                        {person?.personal.location ?
                                                            <BarberProfileMap location={person.personal.location}/> :
                                                            "Здесь могла бы быть ваша карта"
                                                        }

                                                </GridContainer>
                                            ),
                                        },
                                        {
                                            tabButton: "Settings",
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
                                            tabButton: "Reviews",
                                            tabIcon: Favorite,
                                            tabContent: (
                                                <GridContainer justifyContent="center">
                                                    <Box>
                                                        <Box>
                                                            {person?.personal.reviews?.map((item) => (
                                                                <Box className={classes.reviews}>
                                                                    <Box className={classes.author}>
                                                                        <Typography>
                                                                            <b>{item.userId?.name}</b>
                                                                        </Typography>
                                                                    </Box>
                                                                    <Box p={1} mb={1}>
                                                                        <Typography>{item.text}</Typography>
                                                                    </Box>
                                                                    <Box textAlign="end">{correctTime(item.createdAt)}</Box>
                                                                </Box>
                                                            ))}
                                                        </Box>
                                                    </Box>
                                                </GridContainer>
                                            ),
                                        },
                                    ]}
                                />
                            </GridItem>
                        </GridContainer>
                    </div>
                </div>
            </div>}
          {/*Here's could be your FOOTER*/}
          <Footer />
        </div>
        </>
    );
}

export default BarberProfile;