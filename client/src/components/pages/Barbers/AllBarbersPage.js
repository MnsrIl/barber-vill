import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBarbers } from "../../../redux/feautures/barbers";
import Header from "../Header";

const useStyles = makeStyles((theme) => ({
  main: {
    margin: 0,
    height: "120%",
  },
  header: {
    position: "relative",
    overflow: "hidden",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "flex-start",
    alignContent: "flex-start",
    height: "50vw",
    minHeight: 400,
    maxHeight: 550,
    minWidth: 300,
    color: "#eee",
    width: "100%",
    "&:after": {
      content: "''",
      width: "100%",
      height: "100%",
      position: "absolute",
      bottom: 0,
      left: 0,
      zIndex: -1,
      background:
        "linear-gradient(to bottom, rgba(0,0,0,0.12) 40%,rgba(27,32,48,1) 100%)",
    },
    "&:before": {
      content: "''",
      width: "100%",
      height: "200%",
      position: "absolute",
      top: 0,
      left: 0,
      webkitBackfaceVisibility: "hidden",
      webkitTransform: "translateZ(0)",
      backfaceVisibility: "hidden",
      transform: "translateZ(0)",
      background:
        "#1B2030 url('https://top-barbershop.com/media/2017/05/Barber2vk-1800x1194.jpg') 50% 0 no-repeat",
      backgroundSize: "100%",
      backgroundAttachment: "fixed",
      animation: `$grow 360s  linear 10ms infinite`,
      transition: "all 0.4s ease-in-out",
      zIndex: -2,
    },
  },
  "@keyframes grow": {
    "0%": {
      transform: "scale(1) translateY(0px)",
    },
    "50%": {
      transform: "scale(1.2) translateY(-400px)",
    },
  },
  cardBox: {
    position: "relative",
    overflow: "hidden",
    marginRight: 25,
    marginBottom: 25,
    "&:hover img": {
      transform: "scale(1.2)",
    },
  },
  card: {
    display: "block",
    "&::before": {
      position: "absolute",
      content: '""',
      background: "rgba(0,0,0, 0.8)",
      width: 0,
      height: "100%",
      left: "50%",
      transition: "all 0.5s",
      zIndex: 1,
    },
    "&:hover": {
      "&::before": {
        width: "100%",
        left: 0,
      },
    },
  },
  hiddenText: {
    position: "absolute",
    color: "#ffffff",
    right: 0,
    left: 0,
    top: 20,
    bottom: 0,
    width: "100%",
    height: "120px",
    margin: "auto",
    textAlign: "center",
    transform: "scale(5)",
    boxShadow: "0 0 0 2px rgba(180,180,180, 0.7)",
    borderRadius: "10%",
    opacity: 0,
    transition: "all 2s",
    zIndex: 2,
    "&:hover": {
      opacity: 1,
      transform: "scale(2)",
    },
  },
  img: {
    maxHeight:420,
    transition: "all 0.5s",
  },
}));

function AllBarbersPage() {
  const classes = useStyles();

  const { loading, barbers } = useSelector((store) => store.barbers);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllBarbers());
  }, [dispatch]);

  return (
    <Grid container className={classes.main}>
      {loading ? (
        <Box>
          <h1>loading...</h1>
        </Box>
      ) : (
        <>
          <Grid className={classes.header}>
            <Header />
          </Grid>
          <Grid item xs={12} style={{ margin: 100, textAlign: "center" }}>
            <Typography variant="h2" style={{ color: "white" }}>
              Все парикмахеры
            </Typography>
          </Grid>
          <Grid container style={{ display: "flex", justifyContent: "center" }}>
            {barbers.map((item) => (
              <Grid item xs={12} sm={3} className={classes.cardBox}>
                <Card className={classes.card}>
                  <Box>
                    <CardMedia
                      component={"img"}
                      src={item?.personal.avatar}
                      className={classes.img}
                    />
                    <Box className={classes.hiddenText}>
                      <Typography>{item?.personal.email}</Typography>
                      <Typography>{item?.personal.telegram}</Typography>
                    </Box>
                    <CardContent>
                      <Typography
                        variant="h5"
                        component="h2"
                        style={{ textAlign: "center" }}
                      >
                        {item?.name} {item?.personal.lastname}
                      </Typography>
                    </CardContent>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Grid>
  );
}

export default AllBarbersPage;
