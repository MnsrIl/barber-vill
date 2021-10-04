import { Box } from "@mui/system";
import * as React from "react";
import {
  Collapse,
  FormControl,
  Grid,
  InputLabel,
  List,
  ListItemButton,
  ListItemText,
  OutlinedInput,
  Select,
  Modal,
  Fade,
  Button, Snackbar,
} from "@mui/material";
import { makeStyles, TextField, Typography } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import { useDispatch, useSelector } from "react-redux";
import { getAllBarbers } from "../../../redux/feautures/barbers";
import {useEffect, useState} from "react";
import {Error} from "@mui/icons-material";
import {sendRequest} from "../../../redux/feautures/clients";
import ForwardRoundedIcon from '@mui/icons-material/ForwardRounded';

export const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: "white",
    marginTop: 95,
    width: 1010,
    height: 640,
    margin: "0 auto",
    padding: 40,
    borderRadius: 40,
    boxShadow: "inset 0px 1px 11px 2px teal",
  },
  title: {
    textAlign: "center",
  },
  balance:{
    textAlign:"end"
  },  
  data:{
    display: "flex",
    justifyContent: "center",
    padding: "20px",
  },
  sendBtn: {
    textAlign: "center",
    paddingTop: "100px",
  },
}));

function ModalPage(props) {
  const person = useSelector((store) => store.auth.person);
  const barbers = useSelector((store) => store.barbers.barbers);
  const sending = useSelector(store => store.clients.sendingRequest);
  const success = useSelector(store => store.clients.success);
  const error = useSelector(store => store.clients.error);

  const classes = useStyles();
  const dispatch = useDispatch();

  const [state, setState] = useState({
    date: new Date(Date.now()),
    beard: null,
    hairstyle: null,
    barberId: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    dispatch(sendRequest(state));
  }

  const [snackOpen, setSnackOpen] = useState(false);

  const handleCloseSnack = () => {
    setSnackOpen(false)
    dispatch({type: "client/clearData"});
  }

  useEffect(() => {

        dispatch(getAllBarbers());

  }, [dispatch]);

  useEffect(() => {
    if ((error || success) && props.opened) {
      setSnackOpen(true)
    }
  }, [success, error, props.opened])

  const handleChangeDate = (newDate) => {
    setState({...state, date: newDate});
  }

  return (
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={props.opened}
        onClose={props.handleClose}
        closeAfterTransition
      >
      <div>
        <Snackbar
            open={snackOpen}
            autoHideDuration={3000}
            variant={error ? "error" : "success"}
            onClose={handleCloseSnack}
            message={
              <div>
              <span style={{ marginRight: "8px" }}>
                <Error fontSize="large" color={error ? "error" : "success"} />
              </span>
                <span> {error?.toString() || success?.toString()} </span>
              </div>
            }
        />

        <Fade in={props.opened}>

          <Grid xs={10} className={classes.container}>
            <Typography className={classes.balance}>
              Баланс: {person?.personal?.balance}$
            </Typography>
            <Typography variant="h2" className={classes.title}>
              Оформление заявки
            </Typography>

            <Box display="flex" justifyContent="center" mt="30px">
              <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-name-label">
                  Выберите парикмахера
                </InputLabel>

                <Select input={<OutlinedInput label="Выберите парикмахера" />}>
                  <Collapse in={props.opened} timeout="auto" unmountOnExit>
                    {barbers.map((item) => (
                      <List component="div" disablePadding key={item._id}>
                        <ListItemButton sx={{ pl: 4 }}>
                          <NavLink to="" style={{ textDecoration: "none"}}>
                            <ListItemText primary={item?.name} />
                          </NavLink>
                        </ListItemButton>
                      </List>
                    ))}
                  </Collapse>
                </Select>
              </FormControl>
              <Box pt="17px">
                  <ForwardRoundedIcon fontSize="large"/>
              </Box>
            </Box>

            <Typography variant="h6" className={classes.data}>
              Выберите дату
            </Typography>
            <Box display="flex" justifyContent="center">
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  renderInput={(params) => <TextField {...params} />}
                  value={state.date}
                  onChange={handleChangeDate}
                />
              </LocalizationProvider>
            </Box>

            <Box className={classes.sendBtn}>
            <Button
                variant="contained"
                size="large"
                color="error"
                disabled={sending || false}
                onClick={handleSubmit}
            >
              Отправить
            </Button>
            </Box>

          </Grid>
        </Fade>
        </div>
      </Modal>
  );
}

export default ModalPage;
