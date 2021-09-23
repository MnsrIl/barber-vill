import { CardActions, CardMedia, Fab, makeStyles, Typography } from "@material-ui/core";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getOneBeard } from "../../../redux/feautures/beards";

export const useStyles = makeStyles((theme) => ({
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
              src={currentBeards?.image}
            />
          </Box>
          <Typography gutterBottom variant="h5" component="h2">
            {currentBeards?.name}
          </Typography>
          <Typography gutterBottom component="h2">
            {currentBeards?.price} ₽
          </Typography>

          <CardActions className={classes.btnBox}>
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
          </CardActions>
        </Box>
      )}
    </Box>
  );
}

export default OneBeard;
