import React from "react";
import {
  Box,
  Grid,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { useState } from "react";
import {Modal, Button} from "@mui/material";

const useStyles = makeStyles({
  card: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    top: 30,
    margin: "0 auto",
    height: 300,
    width: 500,
    background:
      "linear-gradient(90deg, rgba(9,149,200,1) 0%, rgba(9,120,180,1) 100%)",
    borderRadius: "2.5mm",
  },
  visaBox: {
    padding: "20px 20px 0 0",
    textAlign: "right",
  },
  visa: {
    width: 80,
    maxWidth: "100%",
  },
  chipBox: {
    paddingLeft: 20,
    marginTop: 20,
  },
  chip: {
    width: 50,
    maxWidth: "100%",
  },
  textBox: {
    margin: "0 auto",
    marginTop: 150,
    padding: 40,
    width: 700,
  },
  textInputsWrapper: {
    width: "100%",
  },
  textInputBlock: {
    margin: "16px",
    width: 170,
  },
  submitBtn: {
    marginTop: 20,
  },
  textInput: {
    width: "95%",
    margin: 15,
  },
  data:{
    color: "#fff", 
    textShadow: "1px 1px #444"
  }
});

function Balance(props) {
  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [MM, setMM] = useState("");
  const [YY, setYY] = useState("");

  const handleName = (value) => {setName(value)};

  const handleCardNumber = (value) => {setCardNumber(value)};

  const handleMM = (value) => {setMM(value)};

  const handleYY = (value) => {setYY(value)};

  const classes = useStyles();
  return (
      <Modal
        open={props.modalOpen}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Grid style={{ margin: "0 auto", width: '40%' }}>
          <Paper className={classes.card}>
            <Box className={classes.visaBox}>
              <img
                className={classes.visa}
                src="https://intocode.github.io/payment-card-material-ui-build/static/media/visa.aca7fbdd.png"
                alt="pic"
              />
            </Box>
            <Box className={classes.chipBox}>
              <img
                className={classes.chip}
                src="https://intocode.github.io/payment-card-material-ui-build/static/media/chip.4b08b077.png"
                alt="pic"
              />
            </Box>
            <Box className={classes.cardTextBlock}>
              <Box>
                <Typography
                  variant={"h5"}
                  style={{
                    color: "#fff",
                    textShadow: "1px 1px #444",
                    fontSize: "30px",
                    padding: "25px",
                  }}>
                  {cardNumber ? cardNumber : "0000 0000 0000 0000"}
                </Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" p="30px">
                <Box>
                  <Typography className = {classes.data}>
                    {name ? name : "ФАМИЛИЯ ИМЯ"}
                  </Typography>
                </Box>
                <Box display="flex">
                  <Typography className = {classes.data}>
                    {MM ? MM : "MM"}
                  </Typography>
                  <Typography className = {classes.data}>
                    /
                  </Typography>
                  <Typography className = {classes.data}>
                    {YY ? YY : "ГГ"}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Paper>

          <Paper className={classes.textBox}>
            <Box pt="150px">
              <TextField
                label={"Имя на карте"}
                variant="outlined"
                onChange={(e) => handleName(e.target.value)}
                className={classes.textInput}
              />

              <TextField
                label={"Номер карты"}
                variant="outlined"
                onChange={(e) => handleCardNumber(e.target.value)}
                className={classes.textInput}
              />
            </Box>
            <Grid className={classes.textInputsWrapper} container>
              <TextField
                label={"ММ"}
                variant="outlined"
                onChange={(e) => handleMM(e.target.value)}
                className={classes.textInputBlock}
              />
              
              <TextField
                label={"ГГ"}
                variant="outlined"
                onChange={(e) => handleYY(e.target.value)}
                className={classes.textInputBlock}
              />

              <TextField
                type={"password"}
                label={"CVV"}
                variant="outlined"
                className={classes.textInputBlock}
              />
            </Grid>
            <Box className={classes.submitBtn}>
              <TextField
                label={"Введите сумму"}
                variant="outlined"
              />
              <Button
                variant={"contained"}
                color={"primary"}
                style={{ padding: 15 }}
              >
                Пополнить
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Modal>
  );
}

export default Balance;
