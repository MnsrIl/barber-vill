import { Box, CardMedia, Fab, Grid, makeStyles, Typography } from "@material-ui/core";
import {forwardRef, useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getOneHairstyle } from "../../../redux/feautures/hairstyles";
import Header from "../Header";
import {Dialog, IconButton, Slide} from "@mui/material";
import {Room, RoomOutlined} from "@mui/icons-material";
import Image from "../../../image/imgonline.png"
import {OBJModel, Tick} from "react-3d-viewer";

export const useStyles = makeStyles((theme) => ({
  image:{
    width:600,
    height:600
  },
  name:{
  //  textAlign:"center",
  //  fontSize:30
  }
}));

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function OneHairStyle(props) {
  const { loading, currentHairstyle } = useSelector((store) => store.hairstyles);
  
  const classes = useStyles();

  const [state, setState] = useState({x: 0, y: 0, z: 0});

  useEffect(() => {

    if (hairstyleId === 'kladka') {
      let tick = Tick(() => {
        const rotation = state;
        rotation.y += 0.003;
        setState(rotation);
      })
      return () => tick.animate = false;
    }

    }, [state]);

  const { hairstyleId } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    if (hairstyleId !== 'kladka') {
      dispatch(getOneHairstyle(hairstyleId));
    }
  }, [hairstyleId, dispatch]);

  return (
    <Grid style={{color:"white", 
    // backgroundColor:"#150909"
    // backgroundImage:`url(${Image})`, backgroundSize:"100%", backgroundRepeat:"no-repeat", height:800
    }}>
      <Header />
        {loading ? (
          <Box>
            <h1>Идет загрузка...</h1>
          </Box>
        ) : (
          <Grid container style={{justifyContent:"center", backgroundColor:"rgba(0,0,0, 0.7)", width:'75%',margin:"0 auto", padding:40, borderRadius:40,}}>
           <Grid item xs={12} sm={4} style={{position:'relative'}}>
            <Typography gutterBottom variant="h3" className={classes.name}>
              {hairstyleId === 'kladka' ? 'Кладка' : currentHairstyle?.name}
            </Typography>
            <Typography gutterBottom variant="h5">
              Категория: {hairstyleId === 'kladka' ? 'Короткие' : currentHairstyle?.categoryId.name}
            </Typography>
            <Typography gutterBottom variant="h5">
              Цена: {hairstyleId === 'kladka' ? '5000' : currentHairstyle?.price} ₽
            </Typography>

            <Fab
              variant="extended"
              size="small"
              color="primary"
              aria-label="add"
              style={{position:'absolute', bottom:'2%'}}
            >
              <Link to={`/`}>
              Оставить заявку
              </Link>
            </Fab> 
            </Grid>
             <Grid item xs={12} sm={6}>
               {
                 hairstyleId === 'kladka' ?
                     <OBJModel
                         background={'#5d3939'}
                         className={classes.image}
                         src={'/assets/models/FemaleHairBlender.obj'}
                         position={{x:0, y: -46, z: -10}}
                         rotation={state}
                     />
                       :
                     <CardMedia
                         className={classes.image}
                         component={"img"}
                         src={currentHairstyle?.image}
                     />
               }

            </Grid>
          </Grid>
        )}
    </Grid>
  );
}

export default OneHairStyle;
