import {
  Box,
  Button,
  CardMedia,
  Fab,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOneHairstyle } from "../../../redux/feautures/hairstyles";
import Header from "../Header";
import ModalPage from "../Requests/Modal";

export const useStyles = makeStyles((theme) => ({
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
  },
 
}));

function OneHairStyle(props) {

  const { loading, currentHairstyle } = useSelector((store) => store.hairstyles);

  const classes = useStyles();

  const { hairstyleId } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOneHairstyle(hairstyleId));
  }, [hairstyleId, dispatch]);

  return (
    <Grid style={{ color: "white", minHeight: 800 }}>
      <Header />
      {loading ? (
        <Box className={classes.loading}>
          Идет загрузка...
        </Box>
      ) : (
        <Grid container className={classes.container}>
          <Grid item xs={12} sm={4} style={{ position: "relative" }}>
            <Typography gutterBottom variant="h3">
              {currentHairstyle?.name}
            </Typography>
            <Typography gutterBottom variant="h5" style={{borderBottom:'1px solid grey'}}>
              Категория: {currentHairstyle?.categoryId.name}
            </Typography>
            <Typography gutterBottom variant="h5" style={{borderBottom:'1px solid grey'}}>
              Цена: {currentHairstyle?.price} ₽
            </Typography>

            <Fab
              variant="extended"
              size="small"
              color="secondary"
              aria-label="add"
              style={{ position: "absolute", bottom: "2%" }}
            >
              <Button>
                <ModalPage />
              </Button>
            </Fab>
          </Grid>
          <Grid item xs={12} sm={6}>
            <CardMedia
              className={classes.image}
              component={"img"}
              src={currentHairstyle?.image}
            />
          </Grid>
        </Grid>
      )}
    </Grid>
  );
}

export default OneHairStyle;
