import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {NavLink, useHistory} from "react-router-dom";
import {
  Card,Box,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  makeStyles,
  Typography,
  Fab,
  Button,
} from "@material-ui/core";
import { Skeleton } from "@mui/lab";
import { getAllBeards } from "../../../redux/feautures/beards";
import InfoIcon from "@mui/icons-material/Info";
import Header from "../Header";
import Tab from "@mui/material/Tab";
import {a11yProps} from "../Category/LeftTab";
import ModalPage from "../Requests/Modal";

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

function AllBeardsPage(props) {
  const classes = useStyles();

  const { loading, beards } = useSelector((store) => store.beards);

  const dispatch = useDispatch();
  const history = useHistory()

  useEffect(() => {
    dispatch(getAllBeards(props.categoryId));
  }, [dispatch, props.categoryId]);

  return (
    <>
      <Box fullWidth sx={{mb: 4, background: "#1b2735"}}>
        <Tab label="Бороды" {...a11yProps(0)} style={{color:"white"}} className={'Mui-selected'} />
        <Tab label="Стрижки" {...a11yProps(1)} style={{color:"white"}} onClick={() => history.push('/hairstyles')}/>

      </Box>
      <Box display="flex" flexWrap="wrap" justifyContent="space-between">
        {loading ? (
          <Grid container wrap="wrap">
            {(loading ? Array.from(new Array(8)) : beards).map(
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
          <Grid container
            style={{ display: "flex", justifyContent: "space-around" }}
          >
            {beards.map((item) => (
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
                      <NavLink title={"Подробнее"} to={`/beards/${item._id}`}>
                        <InfoIcon fontSize="large" />
                      </NavLink>
                    </Box>
                  </CardContent>
                      <Button variant="text"
                        style={{ paddingLeft:120}}>
                        <ModalPage />
                      </Button>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </>
  );
}

export default AllBeardsPage;
