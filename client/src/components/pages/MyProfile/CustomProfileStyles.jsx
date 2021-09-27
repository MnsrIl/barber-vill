import {container, title} from "./CustomComponents/material-kit-react"
import imagesStyle from "./CustomComponents/imagesStyles";
import {makeStyles} from "@material-ui/core";
import tooltip from "./CustomComponents/Header/tooltipsStyle";

const textDark = "#0D0D0D";
const borderLight = "rgba(206,212,218, .993)";

const profilePageStyle = theme => ({

    container,
    margin5: {
        margin: "5px",
    },
    profile: {
        textAlign: "center",
        "& img": {
            maxWidth: "160px",
            width: "100%",
            margin: "0 auto",
        },
    },
    description: {
        margin: "1.071rem auto 0",
        maxWidth: "600px",
        color: "#999",
        textAlign: "center !important",
        "& .MuiTextField-root": {
            width: '600px',
            textAlign: "center !important",
            color: "#999"
        }
    },
    name: {
        marginTop: "-80px",
    },
    ...imagesStyle,
    main: {
        background: "#FFFFFF",
        position: "relative",
        zIndex: "3",
    },
    mainRaised: {
        margin: "-60px 30px 0px",
        borderRadius: "6px",
        boxShadow:
            "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)",
    },
    title: {
        ...title,
        display: "inline-block",
        position: "relative",
        marginTop: "30px",
        minHeight: "32px",
        textDecoration: "none",
    },
    socials: {
        marginTop: "0",
        width: "100%",
        transform: "none",
        left: "0",
        top: "0",
        height: "100%",
        lineHeight: "41px",
        fontSize: "20px",
        color: "#999",
    },
    navWrapper: {
        margin: "20px auto 50px auto",
        textAlign: "center",
    },
    labels: {
        padding: `${theme.spacing(1)}px ${theme.spacing(4)}px`,
        fontSize: "13px",
        lineHeight: "5px",
        fontFamily: "PT Mono, monospace",
        fontWeight: 400,
        opacity: 0.45,
        color: `${textDark} !important`,
    },

    rootLabel: {transform: "translate3d(0, -50%, 0)"},

    ...tooltip,

    inputs: {
        position: "relative",
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        fontFamily: "Cutive Mono, monospace",
        color: textDark,
        fontSize: "14px",
        padding: `${theme.spacing(1.5)}px ${theme.spacing(1)}px`,
        borderRadius: "8px",
        border: "1.4px solid",
        boxShadow: "1px 2px 20px rgba(169,198,217,0.29457423) ",
        borderColor: borderLight,

        "&:hover": {
            background: "rgba(169,198,217,0.36457423) ",
        },
    },

});

export default makeStyles(profilePageStyle);
