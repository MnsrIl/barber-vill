const {makeStyles} = require("@mui/styles");

const styles = {
    marker: {
        color: "red"
    },
    closeButton: {
        position: "absolute",
        right: 0,
        zIndex: 3,
        boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px;'
    },
    myLocationButton: {
        position: "absolute",
        right: 0,
        top: 50,
        zIndex: 3,
        boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px;'
    },
    mapContainer: {
        width: "100%",
        height: "100vh"
    }
};

export default makeStyles(styles);