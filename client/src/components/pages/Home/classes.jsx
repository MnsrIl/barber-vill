import { makeStyles } from "@material-ui/core/styles";
import barberShop from "../../../image/barbershop1.jpg";

const useStyles = makeStyles((theme) => ({
    main: {
      position: "relative",
      backgroundImage: `url(${barberShop})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "100% 900px",
      height: 730,
    },
    card: {
      width: 250,
      marginLeft: 50,
      borderRadius: 15,
      position: "relative",
      overflow: "hidden",
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
    triangle: {
      width: 350,
      background: "linear-gradient(297deg, transparent 1.5em, #e9f666 0 )",
      transition: "1s",
      animation: `$show 1000ms ${theme.transitions.easing.easeInOut}`,
      animationFillMode: "forwards",
      animationDelay: "1s",
    },
    triangleB: {
      width: 300,
      background: "linear-gradient(116deg, transparent 1.5em, #2685b9 0)",
      transition: "1s",
      animation: `$show 4000ms ${theme.transitions.easing.easeInOut}`,
      animationFillMode: "forwards",
      animationDelay: "1s",
    },
    "@keyframes show": {
      "0%": { opacity: 0 },
      "100%": { opacity: 1 },
    },
    cardIcon: {
      position: "absolute",
      fontSize: 30,
      color: "black",
      right: 0,
      left: 0,
      top: 0,
      bottom: 0,
      width: 60,
      height: 60,
      margin: "auto",
      textAlign: "center",
      lineHeight: 60,
      transform: "scale(3)",
      background: "rgba(255,255,255, 0.3)",
      boxShadow: "0 0 0 8px rgba(180,180,180, 0.3)",
      opacity: 0,
      transition: "all 0.5s",
      zIndex: 2,
      "&:hover": {
        opacity: 1,
        transform: "scale(1)",
      },
    },
    cardImg: {
      width: "100%",
      height: "100%",
      transition: "all 0.5s",
      "&:hover": {
        transform: "scale(1.2)",
      },
    },
    cardLink: {
      "&::before": {
        position: "absolute",
        content: '""',
        background: "rgba(0,0,0, 0.4)",
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
      height: "50px",
      position: "absolute",
      bottom: "0",
      borderTop: "2px solid white",
      margin: "0 50px",
      textAlign: "center",
      paddingTop: "20px",
    },
  }));

  export default useStyles