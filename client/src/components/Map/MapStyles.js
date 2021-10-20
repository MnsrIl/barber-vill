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
        position: "absolute !important",
        right: 0,
        top: 50,
        zIndex: 3,
        boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px;'
    },
    mapContainer: {
        width: "100%",
        height: "100vh"
    },
    container: {
        width: "600px",
        height: "400px",
        border: "1px solid #fafafa"
    }
};

export default makeStyles(styles);