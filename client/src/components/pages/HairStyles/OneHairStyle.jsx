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
import { getOneHairstyle } from "../../../redux/feautures/hairstyles";
import Header from "../Header";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Slide} from "@mui/material";
import {Room, RoomOutlined} from "@mui/icons-material";
import {OBJModel, Tick} from "react-3d-viewer";
import RequestModal from "../Requests/RequestModal";

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
  loading:{
    display:"flex",
    justifyContent:"center",
    fontSize:"50px"
  },
  image: {
    width: 600,
    height: 600,
    marginLeft:"20px"
  },
 
}));

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function OneHairStyle(props) {

  const { loading, currentHairstyle } = useSelector((store) => store.hairstyles);
  const isLoggedIn = useSelector(store => store.auth.isLoggedIn);
  const { text } = useSelector((store) => store.languages);

  const classes = useStyles();

  const [state, setState] = useState({x: 0, y: 0, z: 0});

  useEffect(() => {

    if (hairstyleId === 'kladka') {
      let tick = Tick(() => {
        const rotation = state;
        rotation.y += 0.003;
        setState(rotation);
      })
      return () => tick.animate = false;
    }

    }, [state]);

  const { hairstyleId } = useParams();
  const [open, setOpen] = useState(false);
  const [selectedHairstyle, setSelectedHairstyle] = useState({})


  const handleOpenModal = () => {
    const kladkaObject = {name: 'Кладка', price: 5000, image: 'https://img1.cgtrader.com/items/2545492/142564a2a7/female-hair-bun-3d-model-obj-fbx-blend.jpg' }
    const hairstyleObject = hairstyleId === 'kladka' ? kladkaObject : currentHairstyle;
    setSelectedHairstyle(hairstyleObject);
    setOpen(true);
  }
  const handleCloseModal = () => {
    setOpen(false)
  }

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (hairstyleId !== 'kladka') {
      dispatch(getOneHairstyle(hairstyleId));
    }
  }, [hairstyleId, dispatch]);

  return (
    <Grid style={{ color: "white", minHeight: 800 }}>
      <Header />
    
      {loading ? (
        <Box className={classes.loading}>
          {text.load}
        </Box>
      ) : (
          <>
            {open && (isLoggedIn ?
                <RequestModal
                    opened={open}
                    handleClose={handleCloseModal}
                    secondType={'beards'}
                    firstType={'hairstyle'}
                    firstItem={selectedHairstyle}
                /> :
                <Dialog
                    open={open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleCloseModal}
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
                    <Button onClick={handleCloseModal} color="primary">
                      {text.close}
                    </Button>
                    <Button onClick={() => history.push("/login")} color="primary">
                      {text.LogIn}
                    </Button>
                  </DialogActions>
                </Dialog>)
            }

            <Grid container className={classes.container}>
              <Grid item xs={12} sm={4} style={{ position: "relative" }}>
                <Typography gutterBottom variant="h3">
                  {hairstyleId === 'kladka' ? 'Кладка' : currentHairstyle?.name}
                </Typography>
                <Typography gutterBottom variant="h5" style={{borderBottom:'1px solid grey'}}>
                  {text.category} {hairstyleId === 'kladka' ? 'Короткие' : currentHairstyle?.categoryId.name}
                </Typography>
                <Typography gutterBottom variant="h5" style={{borderBottom:'1px solid grey'}}>
                  {text.price} {hairstyleId === 'kladka' ? '5000' : currentHairstyle?.price} ₽
                </Typography>

                <Fab
                  variant="extended"
                  size="small"
                  color="secondary"
                  aria-label="add"
                  style={{ position: "absolute", bottom: "2%" }}
                  onClick={handleOpenModal}
                >
                 {text.request}
                </Fab>
              </Grid>
              <Grid item xs={12} sm={6}>
                {
                     hairstyleId === 'kladka' ?
                         <OBJModel
                             background={'#5d3939'}
                             className={classes.image}
                             src={'/assets/models/FemaleHairBlender.obj'}
                             position={{x:0, y: -46, z: -10}}
                             rotation={state}
                         />
                           :
                         <CardMedia
                             className={classes.image}
                             component={"img"}
                             src={currentHairstyle?.image}
                         />
                   }
              </Grid>
            </Grid>
          </>
      )}
    </Grid>
  );
}

export default OneHairStyle;
