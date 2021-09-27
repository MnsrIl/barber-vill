import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { Box } from "@mui/system";
import React from "react";
import Header from "../Header";
import "./index.css";

const useStyles = makeStyles((theme) => ({
  cardBox: {
    position: "relative",
    overflow: "hidden",
    marginRight: 25, 
    marginBottom: 25
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
    // lineHeight: 60,
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
    transition: "all 0.5s",
    "&:hover": {
      transform: "scale(1.2)",
    },
  },
}));

function AllBarbersPage() {
  const classes = useStyles();

  return (
    <Grid container class="main">
      <Grid class="header">
        <Header />
      </Grid>

      <Grid item xs={12} style={{ margin: 100, textAlign: "center" }}>
        <Typography variant="h2" style={{color:'white', }}>Все парикмахеры</Typography>
      </Grid>

      <Grid container style={{ display: "flex", justifyContent: "center"}}>
        <Grid item xs={12} sm={3} className={classes.cardBox}>
          <Card className={classes.card}>
            <Box>
              <CardMedia
                component={"img"}
                src={
                  "https://oldboybarbershop.com/sites/default/files/2019-10/krasnodar-sedina-barber-denis.jpg"
                }
                className={classes.img}
              />
              <Box className={classes.hiddenText}>
                <Typography>lorem</Typography>
                <Typography>ipsum</Typography>
              </Box>
              <CardContent>
                <Typography
                  variant="h5"
                  component="h2"
                  style={{ textAlign: "center" }}
                >
                  Lorem ipsum
                </Typography>
              </CardContent>
            </Box>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={3} className={classes.cardBox}>
          <Card className={classes.card}>
            <Box>
              <CardMedia
                component={"img"}
                src={
                  "https://oldboybarbershop.com/sites/default/files/2019-10/krasnodar-sedina-barber-denis.jpg"
                }
                className={classes.img}
              />
              <Box className={classes.hiddenText}>
                <Typography>lorem</Typography>
                <Typography>ipsum</Typography>
              </Box>
              <CardContent>
                <Typography
                  variant="h5"
                  component="h2"
                  style={{ textAlign: "center" }}
                >
                  Lorem ipsum
                </Typography>
              </CardContent>
            </Box>
          </Card>
        </Grid>

        <Grid item xs={12} sm={3} className={classes.cardBox}>
          <Card className={classes.card}>
            <Box>
              <CardMedia
                component={"img"}
                src={
                  "https://oldboybarbershop.com/sites/default/files/2019-10/krasnodar-sedina-barber-denis.jpg"
                }
                className={classes.img}
              />
              <Box className={classes.hiddenText}>
                <Typography>lorem</Typography>
                <Typography>ipsum</Typography>
              </Box>
              <CardContent>
                <Typography
                  variant="h5"
                  component="h2"
                  style={{ textAlign: "center" }}
                >
                  Lorem ipsum
                </Typography>
              </CardContent>
            </Box>
          </Card>
        </Grid>

      </Grid>
    </Grid>
  );
}

export default AllBarbersPage;
