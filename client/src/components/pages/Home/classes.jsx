import { makeStyles } from "@material-ui/core/styles";
import barberShop from "../../../image/barbershop1.jpg";

const useStyles = makeStyles((theme) => ({
  main: {
    position: "relative",
    backgroundImage: `url(${barberShop})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 900px",
    height: 800,
  },
  card: {
    width: 250,
    marginLeft: 50,
    borderRadius: 15,
    position: "relative",
    overflow: "hidden",
    "&:hover img": {
      transform: "scale(1.2)",
    },
    "&:hover svg": {
      opacity: 1,
      transform: "scale(1)",
      transition: "all 0.5s",
    },
  },
  cardIcon: {
    position: "absolute",
    color: "red",
    right: 0,
    left: 0,
    top: 0,
    bottom: 0,
    margin: "auto",
    textAlign: "center",
    lineHeight: 60,
    transform: "scale(3)",
    background: "rgba(255,255,255, 0.3)",
    boxShadow: "0 0 0 15px rgba(180,180,180, 0.3)",
    borderRadius: "100%",
    opacity: 0,
    zIndex: 2,
  },
  cardImg: {
    width: "100%",
    height: "100%",
    transition: "all 0.5s",
  },
  cardLink: {
    paddingBottom: 30,
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
  footer: {
    width: "90%",
    height: "60px",
    position: "absolute",
    bottom: "0",
    borderTop: "1px solid grey",
    margin: "0 50px",
    textAlign: "center",
    paddingTop: "10px",
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
  contenText: {
    width: 340,
    height: 306,
    marginLeft: "150px",
    marginTop: "80px",
    color: "white",
    fontSize: 18,
  },
  triangle: {
    width: 250,
    background: "linear-gradient(297deg, transparent 1.5em, #e9f666 0 )",
    opacity: 0,
    transition: "1s",
    animation: `$show 1000ms ${theme.transitions.easing.easeInOut}`,
    animationFillMode: "forwards",
    animationDelay: "1s",
  },
  triangleB: {
    width: 250,
    background: "linear-gradient(116deg, transparent 1.5em, #2685b9 0)",
    opacity: 0,
    transition: "1s",
    animation: `$show 4000ms ${theme.transitions.easing.easeInOut}`,
    animationFillMode: "forwards",
    animationDelay: "1s",
  },
  "@keyframes show": {
    "0%": { opacity: 0 },
    "100%": { opacity: 1 },
  },
  blockCard:{
    display:"flex",
    textAlign:"center",
    cursor:"pointer",
    height:"50px",
    marginLeft:"70px"
  }
}));

export default useStyles;
