import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllHairstyles } from "../../../redux/feautures/hairstyles";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { NavLink } from "react-router-dom";
import { Skeleton, Box } from "@mui/material";
import useQuery from "../../../hooks/useQuery";
import InfoIcon from "@mui/icons-material/Info";
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

const AllHairstylesPage = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { loading, hairstyles } = useSelector((store) => store.hairstyles);

  const gender = useQuery("gender");

  useEffect(() => {
    dispatch(getAllHairstyles(props.categoryId, gender));
  }, [dispatch, gender]);

  return (
      <Box display="flex" flexWrap="wrap" justifyContent="space-between" pt='30px'>
        {loading ? (
          <Grid container wrap="wrap">
            {(loading ? Array.from(new Array(8)) : hairstyles).map(
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
          <>
            <Grid
              container
              style={{ display: "flex", justifyContent: "space-around" }}
            >
              {hairstyles.map((item) => (
                <Grid item xs={12} sm={3} className={classes.cardBox}>
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
                        <NavLink title={"Подробнее"}
                          to={`/hairstyles/${item._id}`}
                        >
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
          </>
        )}
      </Box>
  );
};

export default AllHairstylesPage;
