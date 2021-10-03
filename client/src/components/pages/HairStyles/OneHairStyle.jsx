import { Box, CardMedia, Fab, makeStyles, Typography } from "@material-ui/core";
import {forwardRef, useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOneHairstyle } from "../../../redux/feautures/hairstyles";
import Header from "../Header";
import Map from "../Map.jsx";
import {Dialog, IconButton, Slide} from "@mui/material";
import {Room, RoomOutlined} from "@mui/icons-material";

export const useStyles = makeStyles((theme) => ({}));

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function OneHairStyle(props) {
  const { loading, currentHairstyle } = useSelector((store) => store.hairstyles);
  // const [openMap, setOpenMap] = useState();
  // const [location, setLocation] = useState(null);
  //
  // const handleOpenMap = () => setOpenMap(!openMap);
  //
  // const handleSetLocation = (location) => {
  //   handleOpenMap(false);
  //   setLocation(location);
  // }
  const classes = useStyles();

  const { hairstyleId } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOneHairstyle(hairstyleId));
  }, [hairstyleId, dispatch]);

  return (
    <>
      <Header />
      <Box display="flex" flexWrap="wrap" justifyContent="space-between">
        {loading ? (
          <Box>
            <h1>Идет загрузка...</h1>
          </Box>
        ) : (
          <Box>
            <Box>
              <CardMedia
                className={classes.image}
                component={"img"}
                src={currentHairstyle?.image}
              />
            </Box>
            <Typography
              gutterBottom
              component="h2"
              style={{ cursor: "pointer" }}
              // onClick={() => history.push(`/hairstyles/${item.categoryId._id}`)}
            >
              {currentHairstyle?.categoryId.name}
            </Typography>
            <Typography gutterBottom variant="h5" component="h2">
              {currentHairstyle?.name}
            </Typography>
            <Typography gutterBottom component="h2">
              {currentHairstyle?.price} ₽
            </Typography>
            {/*<IconButton onClick={handleOpenMap}>*/}
            {/*    <RoomOutlined htmlColor={"#fafafa"} />*/}
            {/*</IconButton>*/}
            {/*<Typography color={"error"}>*/}
            {/*  Текущее местонахождение: <br />*/}
            {/*  lng = {location?.lng} <br />*/}
            {/*  lat = {location?.lat}*/}
            {/*</Typography>*/}
            {/*<Dialog*/}
            {/*  fullScreen*/}
            {/*  open={openMap}*/}
            {/*  onClose={handleOpenMap}*/}
            {/*  TransitionComponent={Transition}*/}
            {/*>*/}
            {/*  <Map handleClose={handleSetLocation} />*/}
            {/*</Dialog>*/}

            <Fab
              variant="extended"
              size="small"
              color="primary"
              aria-label="add"
              className={classes.margin}
            >
              {/* <NavLink to={``}> */}
              Оставить заявку
              {/* </NavLink> */}
            </Fab>
          </Box>
        )}
      </Box>
    </>
  );
}

export default OneHairStyle;
