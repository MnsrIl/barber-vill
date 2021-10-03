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
import Header from "../Header";
import ModalPage from "../Requests/Modal";
import { getOneBeard } from "../../../redux/feautures/beards";

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

function OneBeard(props) {
  const classes = useStyles();

  const { loading, currentBeards } = useSelector((store) => store.beards);

  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOneBeard(id));
  }, [id, dispatch]);

  return (
    <Grid style={{ color: "white", minHeight: 800 }}>
      <Header />
      {loading ? (
        <Box className={classes.loading}>Идет загрузка...</Box>
      ) : (
        <Grid container className={classes.container}>
          <Grid item xs={12} sm={4} style={{ position: "relative" }}>
            <Typography gutterBottom variant="h3">
              {currentBeards?.name}
            </Typography>
            <Typography
              gutterBottom
              variant="h5"
              style={{ borderBottom: "1px solid grey" }}
            >
              Цена: {currentBeards?.price} ₽
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
              src={currentBeards?.image}
            />
          </Grid>
        </Grid>
      )}
    </Grid>
  );
}

export default OneBeard;
