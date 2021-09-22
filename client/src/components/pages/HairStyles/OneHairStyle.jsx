import { CardActions, CardMedia, Fab, makeStyles, Typography } from "@material-ui/core";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getOneHairstyle } from "../../../redux/feautures/hairstyles";

export const useStyles = makeStyles((theme) => ({
  }));

function OneHairStyle(props) {
  const classes = useStyles();

  const { loading, currentHairstyle } = useSelector((store) => store.hairstyles);

  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOneHairstyle(id));
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
              src={currentHairstyle?.image}
            />
          </Box>
          <Typography
            gutterBottom
            component="h2"
            style={{ cursor: "pointer" }}
            // onClick={() => history.push(`/hairstyles/${item.categoryId._id}`)}
          >
            {currentHairstyle?.categoryId}
          </Typography>
          <Typography gutterBottom variant="h5" component="h2">
            {currentHairstyle?.name}
          </Typography>
          <Typography gutterBottom component="h2">
            {currentHairstyle?.price} ₽
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

export default OneHairStyle;
