// nodejs library to set properties for components
import PropTypes from "prop-types";

// @material-ui/core components
import {Grid, makeStyles} from "@material-ui/core";

const useStyles = makeStyles({
  grid: {
    marginRight: "-15px",
    marginLeft: "-15px",
    width: "auto",
  },
});

export default function GridContainer(props) {
  const classes = useStyles();
  const { children, className, ...rest } = props;

  return (
    <Grid container {...rest} className={`${classes.grid} ${className}`}>
      {children}
    </Grid>
  );
}

GridContainer.defaultProps = {
  className: "",
};

GridContainer.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
