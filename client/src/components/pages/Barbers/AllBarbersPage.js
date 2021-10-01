import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@material-ui/core";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBarbers } from "../../../redux/feautures/barbers";
import Header from "../Header";
import { useStyles } from "./classes";
import preloader from "../../../image/loading.gif";
import { useHistory } from "react-router-dom";
import { Button } from "@mui/material";

function AllBarbersPage() {
  const classes = useStyles();
  const history = useHistory();

  const { loading, barbers } = useSelector((store) => store.barbers);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllBarbers());
  }, [dispatch]);

  return (
    <Grid container className={classes.main}>
      {loading ? (
        <Box>
          <img src={preloader} alt="" className={classes.preloader} />
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
                      <Button
                        style={{ cursor: "pointer" }}
                        onClick={() => history.push(`/barber/${item._id}`)}>
                          Подробнее
                      </Button>
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
