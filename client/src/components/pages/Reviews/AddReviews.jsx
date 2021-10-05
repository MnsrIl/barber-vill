import * as React from "react";
import { useState } from "react";
import {
  Box,
  IconButton,
  Typography,
  FormControl,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { Snackbar,InputLabel,TextareaAutosize } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { SendOutlined, Error } from "@mui/icons-material";
import { addReviews } from "../../../redux/feautures/clients";

const useStyles = makeStyles((theme) => ({
  input: {
    position: "relative",
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    fontFamily: "Cutive Mono, monospace",
    color: "#0D0D0D",
    fontSize: "14px",
    padding: `${theme.spacing(1.5)}px ${theme.spacing(1)}px`,
    borderRadius: "8px",
    border: "1.4px solid",
    boxShadow: "1px 2px 20px rgba(169,198,217,0.29457423) ",
    borderColor: "rgba(206,212,218, .993)",
    height: "50px",
    margin: "0px 8px",
    width: "285px",
    "&:hover": {
      background: "rgba(169,198,217,0.36457423) ",
    },
  },
  form: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  reviews: {
    padding: 8,
    marginTop: 16,
    width: "400px",
    margin: "0 auto",
    borderBottom: "1px solid #d9d5d5",
  },
  author: {
    padding: 8,
    marginBottom: 8,
    display: "flex",
    justifyContent: "space-between",
    color: "#9c27b0",
  },
}));

const correctTime = (time) =>
  `${new Date(time).toLocaleDateString()}_${new Date(time)
    .toTimeString()
    .slice(0, 9)}`;

const AddReviews = () => {
  const dispatch = useDispatch();

  const classes = useStyles();

  const { error, adding, success } = useSelector((store) => store.clients);

  const { currentBarber } = useSelector((store) => store.barbers);

  const [reviewInput, setReviewInput] = useState();

  const [open, setOpen] = React.useState(false);

  const handleChange = (e) => setReviewInput(e.target.value);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(addReviews(reviewInput));
    if (!error) {
      setReviewInput("");
      setOpen(true);
    }
  };

  return (
    <Box>
      <form className={classes.form}>
        <FormControl required margin="normal">
          <InputLabel htmlFor="review">Отзывы</InputLabel>
          <TextareaAutosize
            placeholder={"Оставьте отзыв о парикмахере"}
            maxRows={2}
            value={reviewInput}
            name="review"
            type="text"
            autoComplete="off"
            className={classes.input}
            disableUnderline={true}
            onChange={handleChange}
          />
        </FormControl>
        <IconButton
          style={{ top: "12px" }}
          disabled={adding}
          type="submit"
          onClick={handleSubmit}
          color="primary"
        >
          <SendOutlined />
        </IconButton>
      </form>
      <Box>
        {currentBarber?.personal.reviews?.map((item) => (
          <Box className={classes.reviews}>
            <Box className={classes.author}>
              <Typography>
                <b>{item.userId?.name}</b>
              </Typography>
            </Box>
            <Box p={1} mb={1}>
              <Typography>{item.text}</Typography>
            </Box>
            <Box textAlign="end">{correctTime(item.createdAt)}</Box>
          </Box>
        ))}
      </Box>
      <Box>
        <Snackbar
          open={open}
          autoHideDuration={3000}
          variant={error ? "error" : "success"}
          onClose={handleClose}
          message={
            <div>
              <span style={{ marginRight: "8px" }}>
                <Error fontSize="large" color={error ? "error" : "success"} />
              </span>
              <span> {error || success} </span>
            </div>
          }
        />
      </Box>
    </Box>
  );
};

export default AddReviews;
