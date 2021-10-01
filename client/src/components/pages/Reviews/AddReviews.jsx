import * as React from "react";
import { Box, IconButton, Typography, Grid } from "@material-ui/core";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TextField, Snackbar } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { SendOutlined, Error } from "@mui/icons-material";
import { addReviews } from "../../../redux/feautures/clients";

const useStyles = makeStyles((theme) => ({
  input: {
    "& .MuiTextField-root": {
      margin: theme.spacing(2),
      width: "90ch",
    },
  },
}));

const correctTime = (time) =>
  `${new Date(time).toLocaleDateString()} -- ${new Date(time)
    .toTimeString().slice(0, 9)}`;

const AddReviews = () => {

  const dispatch = useDispatch();

  const classes = useStyles();

  const { error, adding, success } = useSelector((store) => store.clients);

  const { currentBarber } = useSelector((store) => store.barbers);

  const [reviewInput, setReviewInput] = useState();

  const [open, setOpen] = React.useState(false);;

  const handleChange = (e) => setReviewInput(e.target.value);

  const handleClose = () => { setOpen(false) };
   
  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(addReviews(reviewInput));
    if (!error) {
      setReviewInput("");
      setOpen(true);
    }
  };

  return (
    <Grid>
      <Box>
        {currentBarber?.personal.reviews?.map((item) => (
          <Box width="90%">
            <Box p={1} mt={2} display="flex" justifyContent="space-between">
              <Box display="flex" alignItems={"center"}></Box>
              <Box>{correctTime(item.createdAt)}</Box>
            </Box>
            <Box p={1} mb={1}>
              <Typography>{item.text}</Typography>
            </Box>
            <Box p={1} mb={1}>
              <Typography>{item.userId.name}</Typography>
            </Box>
          </Box>
        ))}
      </Box>
      <Box>
        <form className={classes.input}>
          <br />
          <br />
          <TextField
            id="outlined-multiline-static"
            multiline
            rows={5}
            aria-colspan={4}
            placeholder="Введите текст"
            value={reviewInput}
            onChange={handleChange}
            variant="outlined"
          />
          <IconButton
            disabled={adding}
            type="submit"
            onClick={handleSubmit}
            style={{ marginTop: "60px" }}
            color="primary"
          >
            <SendOutlined />
          </IconButton>
        </form>
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
    </Grid>
  );
};

export default AddReviews;
