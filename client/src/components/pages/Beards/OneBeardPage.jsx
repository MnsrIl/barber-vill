import {
  Box,
  Button,
  CardMedia,
  Fab,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, {forwardRef, useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import {useHistory, useParams} from "react-router-dom";
import Header from "../Header";
import { getOneBeard } from "../../../redux/feautures/beards";
import RequestModal from "../Requests/RequestModal";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide} from "@mui/material";

const useStyles = makeStyles((theme) => ({
  container: {
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0, 0.8)",
    width: "75%",
    margin: "0 auto",
    padding: 40,
    borderRadius: 40,
    boxShadow: "0px 1px 5px 2px grey",
  },
  loading: {
    display: "flex",
    justifyContent: "center",
    fontSize: "50px",
  },
  image: {
    width: 600,
    height: 600,
    marginLeft: "20px",
  },
}));

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function OneBeard(props) {
  const classes = useStyles();

  const { loading, currentBeards } = useSelector((store) => store.beards);
  const isLoggedIn = useSelector(store => store.auth.isLoggedIn);
  const text = useSelector((store) => store.languages.text);

  const { beardId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  const [openModal, setOpenModal] = useState(false);

  const handleClose = () => setOpenModal(false);

  const handleOpenModal = () => setOpenModal(true);

  useEffect(() => {
    dispatch(getOneBeard(beardId));
  }, [beardId, dispatch]);

  return (
    <Grid style={{ color: "white", minHeight: 800 }}>
      <Header />
      {loading ? (
        <Box className={classes.loading}>{text.load}</Box>
      ) : (
          <>
            {openModal && (isLoggedIn ?
                <RequestModal
                    opened={openModal}
                    handleClose={handleClose}
                    secondType={'hairstyles'}
                    firstType={'beard'}
                    firstItem={currentBeards}
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

            <Grid container className={classes.container}>
              <Grid item xs={12} sm={4} style={{ position: "relative" }}>
                <Typography gutterBottom variant="h3">
                  {currentBeards?.name}
                </Typography>
                <Typography gutterBottom variant="h5" style={{borderBottom:'1px solid grey'}}>
                  Категория: {currentBeards?.categoryId.name}
                </Typography>
                <Typography
                  gutterBottom
                  variant="h5"
                  style={{ borderBottom: "1px solid grey" }}
                >
                  {text.price} {currentBeards?.price} ₽
                </Typography>

                <Fab
                  variant="extended"
                  size="small"
                  color="secondary"
                  aria-label="add"
                  style={{ position: "absolute", bottom: "2%" }}
                  onClick={handleOpenModal}
                >
                  Оставить заявку
                </Fab>
              </Grid>
              <Grid item xs={12} sm={6}>
                <CardMedia
                  className={classes.image}
                  component={"img"}
                  src={currentBeards?.image}
                />
              </Grid>
            </Grid>
          </>
      )}
    </Grid>
  );
}

export default OneBeard;
