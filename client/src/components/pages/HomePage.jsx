import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@material-ui/core";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import hairstyles from "../../image/hairstyles1.jpg";
import beards from "../../image/men-beards.jpg";
import Header from "./Header";


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
    fontSize:12,
    padding:12
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

  return (
    <Grid container className={classes.main}>
      <Header />

      <Grid xs={12} className={classes.content}>
        <Grid item xs={12} sm={5}>
          <Box width={340} height={306} ml="150px" mt="200px">
            <Box>
              <h1>Твой новый друг с доставкой на дом</h1>
            </Box>
            <Box>
              Онлайн-магазин домашних животных подарит тебе нового друга в
              несколько кликов. Действуй!
            </Box>
            <Button
              className={classes.btn}
              component={Link}
              to={""}
              size="medium"
              color="secondary"
              variant={"contained"}
            >
              Посмотреть весь список
            </Button>
          </Box>

          <Box display="flex" ml="150px">
            <Card className={classes.card}>
              <CardContent>
                <Typography gutterBottom component="h2">
                  Прически
                </Typography>
              </CardContent>
              <CardActionArea>
                <Box pb="30px" width="90%">
                  <CardMedia
                    className={classes.image}
                    component={"img"}
                    src={beards}
                  />
                </Box>
              </CardActionArea>
              <CardActions>
                <Button
                  component={Link}
                  to={""}
                  size="medium"
                  color="primary"
                  variant={"contained"}
                >
                  Подробнее
                </Button>
              </CardActions>
            </Card>

            <Card className={classes.card}>
              <CardContent>
                <Typography gutterBottom component="h2">
                  Бороды
                </Typography>
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
              <CardActions>
                <Button
                  component={Link}
                  to={""}
                  size="medium"
                  color="primary"
                  variant={"contained"}
                >
                  Подробнее
                </Button>
              </CardActions>
            </Card>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}></Grid>
      </Grid>
    </Grid>
  );
}

export default HomePage;
