import React, {forwardRef, useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import {NavLink, useHistory} from "react-router-dom";
import {
  Card,Box,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  makeStyles,
  Typography,
  Fab,
  Button,
} from "@material-ui/core";
import { Skeleton } from "@mui/lab";
import { getAllBeards } from "../../../redux/feautures/beards";
import InfoIcon from "@mui/icons-material/Info";
import Header from "../Header";
import Tab from "@mui/material/Tab";
import {a11yProps} from "../Category/LeftTab";
import RequestModal from "../Requests/RequestModal";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide} from "@mui/material";

const useStyles = makeStyles((theme) => ({
  card: {
    display: "block",
    boxShadow: "0 .5rem 1rem rgba(0,0,0,.50)",
    borderRadius: 15,
    position: "relative",
  },
  img: {
    height: 380,
    transition: "all 0.6s",
  },
  content: {
    position: "absolute",
    display: "flex",
    justifyContent: "space-between",
    bottom: "11%",
    background: "rgba(0,0,0, 0.7)",
    color: "white",
    width: "100%",
  },
  cardBox: {
    marginRight: 25,
    marginBottom: 40,
    "&:hover img": {
      transform: "scale(1.2)",
    },
  },
}));

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function AllBeardsPage(props) {
  const classes = useStyles();

  const isLoggedIn = useSelector(store => store.auth.isLoggedIn);
  const { loading, beards } = useSelector((store) => store.beards);

  const [openModal, setOpenModal] = useState(false);
  const [selectedBeard, setSelectedBeard] = useState({});

  const handleClose = () => {
    setSelectedBeard({});
    setOpenModal(false);
  }

  const handleOpenModal = (item) => {
    setSelectedBeard(item);
    setOpenModal(true);
  }

  const dispatch = useDispatch();
  const history = useHistory()

  useEffect(() => {
    dispatch(getAllBeards(props.categoryId));
  }, [dispatch, props.categoryId]);

  return (
    <>
      <Box fullWidth sx={{mb: 4, background: "#1b2735"}}>
        <Tab label="Бороды" {...a11yProps(0)} style={{color:"white"}} className={'Mui-selected'} />
        <Tab label="Стрижки" {...a11yProps(1)} style={{color:"white"}} onClick={() => history.push('/hairstyles')}/>

      </Box>
      <Box display="flex" flexWrap="wrap" justifyContent="space-between">
        {loading ? (
          <Grid container wrap="wrap">
            {(loading ? Array.from(new Array(8)) : beards).map(
              (item, index) => (
                <Box key={index} sx={{ width: 400, marginLeft: 5, my: 5 }}>
                  <Skeleton
                    animation="wave"
                    variant="rectangular"
                    width={350}
                    height={250}
                  />
                  <Box sx={{ pt: 0.5 }}>
                    <Skeleton />
                    <Skeleton width="60%" />
                  </Box>
                </Box>
              )
            )}
          </Grid>
        ) : (
            <>
              {openModal && (isLoggedIn ?
                  <RequestModal
                      opened={openModal}
                      handleClose={handleClose}
                      secondType={'hairstyles'}
                      firstType={'beard'}
                      firstItem={selectedBeard}
                  /> :
                  <Dialog
                      open={openModal}
                      TransitionComponent={Transition}
                      keepMounted
                      onClose={handleClose}
                      aria-labelledby="alert-dialog-slide-title"
                      aria-describedby="alert-dialog-slide-description"
                  >
                    <DialogTitle id="alert-dialog-slide-title">Вы не авторизованы!</DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-slide-description">
                        Упс.. Чтобы оставить заявку вам необходимо авторизоватсья
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose} color="primary">
                        Закрыть
                      </Button>
                      <Button onClick={() => history.push("/login")} color="primary">
                        Авторизоваться
                      </Button>
                    </DialogActions>
                  </Dialog>)
              }

              <Grid container justifyContent={'space-around'}
                style={{ display: "flex", width: "90vw"}}
              >
                {beards.map((item) => (
                  <Grid key={item._id} item xs={12} sm={3} className={classes.cardBox}>
                    <Card className={classes.card}>
                      <CardMedia
                        component={"img"}
                        src={item.image}
                        className={classes.img}
                      />
                      <CardContent className={classes.content}>
                        <Box>
                          <Typography gutterBottom variant="h5" component="h2">
                            {item.name}
                          </Typography>
                          <Typography gutterBottom component="h2">
                            {item.price} ₽
                          </Typography>
                        </Box>
                        <Box>
                          <NavLink title={"Подробнее"} to={`/beards/${item._id}`}>
                            <InfoIcon fontSize="large" />
                          </NavLink>
                        </Box>
                      </CardContent>

                      <CardActions>
                        <Fab
                            variant="extended"
                            size="small"
                            color="secondary"
                            aria-label="add"
                            style={{ position: "absolute", bottom: "2%" }}
                            onClick={() => handleOpenModal(item)}
                        >
                          Оставить заявку
                        </Fab>
                      </CardActions>
                    </Card>
                  </Grid>
              ))}
            </Grid>
          </>
        )}
      </Box>
    </>
  );
}

export default AllBeardsPage;
