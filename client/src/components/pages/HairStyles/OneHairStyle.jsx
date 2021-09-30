import { Box, CardActions, CardMedia, Fab, makeStyles, Typography } from "@material-ui/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
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
          <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2902.505255989104!2d45.69047642042421!3d43.32461525463697!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4051d13abc103637%3A0x8601f7fff1cac51f!2z0KjQutC-0LvQsCDQv9GA0L7Qs9GA0LDQvNC80LjRgNC-0LLQsNC90LjRjyAtIGludG9jb2Rl!5e0!3m2!1sru!2sru!4v1629714148908!5m2!1sru!2sru"
              width="600" height="450" style={{ border:"0" }} allowFullScreen="" loading="lazy" title="school">
          </iframe>

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
