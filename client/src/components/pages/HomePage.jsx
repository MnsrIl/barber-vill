import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@material-ui/core";
import { Box } from "@mui/system";
import { useHistory } from "react-router-dom";
import hairstyles from "../../image/hairstyles1.jpg";
import beards from "../../image/men-beards.jpg";
import Header from "./Header";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";

const useStyles = makeStyles((theme) => ({
  main: {
    background: "linear-gradient(124.13deg, #F4CB38 10.97%, #F4A938 77.98%)",
  },
  card: {
    width: 180,
    marginLeft: 50,
    borderRadius: 20,
  },
  btn: {
    margin: 20,
    borderRadius: 40,
    fontSize: 12,
    padding: 12,
  },
  iconProfile: {
    width: 50,
    height: 50,
  },
  content: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

function HomePage() {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Grid container className={classes.main}>
      <Header />

      <Grid xs={12} className={classes.content}>
        <Grid item xs={12} sm={5}>
          <Box width={340} height={306} ml="150px" mt="150px">
            <Box>
              <h1>Хочешь выглядеть как Султан?</h1>
            </Box>
            <Box>
              Сделай причёску, которая <br /> изменит твою жизнь. <br />
              Жизнь больше не станет прежней, ибо ты будешь выглядеть как -
              НурСултан!
            </Box>
            <Button
              className={classes.btn}
              size="medium"
              color="secondary"
              variant={"contained"}
              style={{ cursor: "pointer" }}
              onClick={() => history.push("/hairstyles")}
            >
              Посмотреть весь список
            </Button>
          </Box>

          <Box display="flex" ml="150px">
            <Card className={classes.card}>
              <CardContent>
                <Box
                  display="flex"
                  justifyContent="space-around"
                  style={{ cursor: "pointer" }}
                  onClick={() => history.push("/hairstyles")}
                >
                  <Typography gutterBottom component="h2">
                    Прически
                  </Typography>
                  <DoubleArrowIcon />
                </Box>
              </CardContent>
              <CardActionArea>
                <Box pb="30px">
                  <CardMedia
                    className={classes.image}
                    component={"img"}
                    src={beards}
                  />
                </Box>
              </CardActionArea>
            </Card>

            <Card className={classes.card}>
              <CardContent>
                <Box
                  display="flex"
                  justifyContent="space-around"
                  style={{ cursor: "pointer" }}
                  onClick={() => history.push("/beards")}
                >
                  <Typography gutterBottom component="h2">
                    Бороды
                  </Typography>
                  <DoubleArrowIcon />
                </Box>
              </CardContent>
              <CardActionArea>
                <Box>
                  <CardMedia
                    className={classes.image}
                    component={"img"}
                    src={hairstyles}
                  />
                </Box>
              </CardActionArea>
            </Card>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}></Grid>
      </Grid>
    </Grid>
  );
}

export default HomePage;
