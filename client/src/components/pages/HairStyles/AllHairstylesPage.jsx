import React, {forwardRef, useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllHairstyles } from "../../../redux/feautures/hairstyles";
import {
  Button,
  Card,
  CardContent,
  CardMedia, Fab,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import {NavLink, useHistory} from "react-router-dom";
import {
  Skeleton,
  Box,
  CardActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Dialog, Slide
} from "@mui/material";
import useQuery from "../../../hooks/useQuery";
import InfoIcon from "@mui/icons-material/Info";
import RequestModal from "../Requests/RequestModal";


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

const AllHairstylesPage = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const { loading, hairstyles } = useSelector((store) => store.hairstyles);
  const isLoggedIn = useSelector(store => store.auth.isLoggedIn);
  const { text } = useSelector((store) => store.languages);

  const [opened, setOpen] = useState(false);
  const [selectedHairstyle, setSelectedHairstyle] = useState({})

  const handleClose = () => setOpen(false);

  const handleOpenModal = (item) => {
    setSelectedHairstyle(item);
    setOpen(true)
  };

  const gender = useQuery("gender");

  useEffect(() => {
    dispatch(getAllHairstyles(props.categoryId, gender));
  }, [dispatch, gender]);


  return (
      <Box display="flex" flexWrap="wrap" justifyContent="space-between" pt='30px'>
        {loading ? (
          <Grid container wrap="wrap">
            {(loading ? Array.from(new Array(8)) : hairstyles).map(
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
            {opened && (isLoggedIn ?
                <RequestModal
                  opened={opened}
                  handleClose={handleClose}
                  secondType={'beards'}
                  firstType={'hairstyle'}
                  firstItem={selectedHairstyle}
                /> :
                <Dialog
                    open={opened}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                  <DialogTitle id="alert-dialog-slide-title">{text.noSignIn}</DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                      {text.errorAuthorisation}
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose} color="primary">
                      {text.close}
                    </Button>
                    <Button onClick={() => history.push("/login")} color="primary">
                      {text.LogIn}
                    </Button>
                  </DialogActions>
                </Dialog>)
            }

            <Grid
              container
              style={{ display: "flex", justifyContent: "space-around", width: gender === 'Ж' ? '95vw' : "100%"}}
            >
              {gender === 'Ж' &&
              <Grid item xs={12} sm={3} className={classes.cardBox} sx={{width: '90vw'}}>
                <Card className={classes.card}>
                  <CardMedia
                      component={"img"}
                      src={'https://img1.cgtrader.com/items/2545492/142564a2a7/female-hair-bun-3d-model-obj-fbx-blend.jpg'}
                      className={classes.img}
                  />
                  <CardContent className={classes.content}>
                    <Box>
                      <Typography gutterBottom variant="h5" component="h2">
                        Кладка
                      </Typography>
                      <Typography gutterBottom component="h2">
                        5000 ₽
                      </Typography>
                    </Box>
                    <Box>
                      <NavLink title={"Подробнее"} to={`/hairstyles/kladka`}>
                        <InfoIcon fontSize="large"/>
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
                        onClick={() => handleOpenModal({name: 'Кладка', price: 5000, image: 'https://img1.cgtrader.com/items/2545492/142564a2a7/female-hair-bun-3d-model-obj-fbx-blend.jpg', })}
                    >
                      {text.request}
                    </Fab>
                  </CardActions>
                </Card>
              </Grid>}
              {hairstyles.map((item) => (
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
                        <NavLink title={text.btnMore}
                          to={`/hairstyles/${item._id}`}
                        >
                          <InfoIcon fontSize="large" />
                        </NavLink>
                      </Box>
                    </CardContent>
                    <Fab
                        variant="extended"
                        size="small"
                        color="secondary"
                        aria-label="add"
                        style={{ position: "absolute", bottom: "2%" }}
                        onClick={() => handleOpenModal(item)}
                    >
                      {text.request}
                    </Fab>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </Box>
  );
};

export default AllHairstylesPage;
