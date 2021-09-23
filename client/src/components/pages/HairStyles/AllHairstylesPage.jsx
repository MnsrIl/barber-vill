import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllHairstyles } from "../../../redux/feautures/hairstyles";
import { Box } from "@mui/system";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Fab,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import Header from "../Header";

const useStyles = makeStyles((theme) => ({
  card: {
    boxShadow: "0 .5rem 1rem rgba(0,0,0,.15)",
    width: 300,
    maxWidth: 300,
    height: 480,
    borderRadius: 10,
    marginTop: theme.spacing(5),
  },
  imgBox: {
    padding: 10,
    backgroundColor: "#ffffff",
  },
  image: {
    objectFit: "contain",
    height: 250,
  },
  content: {
    margin: "20px auto 0",
    borderRadius: 5,
    backgroundColor: "#3f51b5",
    color: "white",
  },
  btnBox: {
    textAlign: "center",
    display: "block",
  },
  nav: {
    color: "inherit",
    textDecoration: "none",
    "&:hover": {
      color: "inherit",
    },
  },
}));

function AllHairstylesPage() {
  const classes = useStyles();
  const history = useHistory();

  const { loading, error, hairstyles } = useSelector(
    (store) => store.hairstyles
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllHairstyles());
  }, [dispatch]);

  return (
    <Box display="flex" flexWrap="wrap" justifyContent="space-between">
      <Header/>
      {loading ? (
        <Grid container wrap="wrap">
          {(loading ? Array.from(new Array(8)) : hairstyles).map((item, index) => (
            <Box key={index} sx={{ width: 300, marginRight: 3, my: 5 }}>
              <Skeleton
                animation="wave"
                variant="rectangular"
                width={300}
                height={200}
              />
                <Box sx={{ pt: 0.5 }}>
                  <Skeleton />
                  <Skeleton width="60%" />
                </Box>
            </Box>
          ))}
        </Grid>
      ) : (
        hairstyles.map((item) => (
          <Card className={classes.card}>
            <Box className={classes.imgBox}>
              <CardMedia
                className={classes.image}
                component={"img"}
                src={item.image}
              />
            </Box>
            <CardContent className={classes.content}>
              <Typography
                gutterBottom
                component="h2"
                style={{ cursor: "pointer" }}
                // onClick={() => history.push(`/hairstyles/${item.categoryId._id}`)}
              >
                {item.categoryId}
              </Typography>
              <Typography gutterBottom variant="h5" component="h2">
                {item.name}
              </Typography>
              <Typography gutterBottom component="h2">
                {item.price} ₽
              </Typography>
            </CardContent>

            <CardActions className={classes.btnBox}>
              <Fab
                variant="extended"
                size="small"
                color="primary"
                aria-label="add"
                className={classes.margin}
              >
                <NavLink className={classes.nav} to={`/hairstyles/${item._id}`}>
                  Подробнее
                </NavLink>
              </Fab>
            </CardActions>
          </Card>
        ))
      )}
    </Box>
  );
}

export default AllHairstylesPage;
