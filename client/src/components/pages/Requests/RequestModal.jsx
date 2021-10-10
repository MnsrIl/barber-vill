import { Box } from "@mui/system";
import * as React from "react";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
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
  Button, Snackbar, MenuItem, IconButton, Tooltip,
} from "@mui/material";
import { makeStyles, TextField, Typography } from "@material-ui/core";
import {NavLink, useHistory} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllBarbers } from "../../../redux/feautures/barbers";
import {useEffect, useState} from "react";
import {Error} from "@mui/icons-material";
import {sendRequest} from "../../../redux/feautures/clients";
import ForwardRoundedIcon from '@mui/icons-material/ForwardRounded';
import {getAllBeards} from "../../../redux/feautures/beards";
import {getAllHairstyles} from "../../../redux/feautures/hairstyles";

import "react-datepicker/dist/react-datepicker.css";
import {setSnackbar} from "../../../redux/feautures/snackbar";

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
  data: {
    display: "flex",
    justifyContent: "center",
    padding: "20px",
  },
  sendBtn: {
    textAlign: "center",
    paddingTop: "100px",
  },
  total: {
    padding: "20px",
    display: "flex",
    justifyContent: "center"
  },
}));

function ModalPage(props) {
  const person = useSelector((store) => store.auth.person);
  const barbers = useSelector((store) => store.barbers.barbers);
  const beards = useSelector(store => store.beards.beards);
  const beardsLoading = useSelector(store => store.beards.loading);
  const hairstyles = useSelector(store => store.hairstyles.hairstyles);
  const hairstylesLoading = useSelector(store => store.hairstyles.loading);
  const sending = useSelector(store => store.clients.sendingRequest);
  const success = useSelector(store => store.clients.success);
  const error = useSelector(store => store.clients.error);

  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory()

  const [state, setState] = useState({
    date: null,
    beard: null,
    hairstyle: null,
    barberId: null,
    secondType: "", //can be only 'beards' or 'hairstyles'
    total: 0
  });

  useEffect(() => {
    setState({...state, secondType: props.secondType, [props.firstType]: props.firstItem, total: props.firstItem.price});
  }, [props.secondType, props.firstItem])

  const handleChangeBarber = (e) => {
    setState({...state, barberId: e.target.value})
  }

  const handleChangeSecondItem = (e) => {

      const type = state.secondType;
      const firstItem = type === 'hairstyles' ? state.beard : state.hairstyle
      const typeArray = type === 'hairstyles' ? hairstyles : beards;

      const secondItem = typeArray.find(item => item._id === e.target.value);

      return setState({...state, [type.slice(0, -1)]: secondItem, total: (secondItem ? secondItem?.price : 0) + firstItem.price});
  }

  const handleReset = () => {
    setState({...state, date: null, total: 0, [state.secondType] : null, barberId: null});
  }

  const handleChangeDate = (date) => {
    setState({...state, date});
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const {secondType, total, ...requestData} = state;

    dispatch(sendRequest(requestData));
  }

  const [snackOpen, setSnackOpen] = useState(false);

  const handleCloseSnack = (e, reason) => {
    console.log(e, 'clicked', reason)
    setSnackOpen(false)
    dispatch({type: "client/clearData"});
  }

  const handleToAboutPage = () => {
    window.open(`/barber/${state.barberId}`, "_blank").focus();
  }

  const handleAboutSecondItem = () => {
    const url = state.secondType === 'beards' ? `/beards/${state.beard._id}` : `/hairstyles/${state.hairstyle._id}`;
    window.open(url, "_blank").focus();
  }

  useEffect(() => {
    switch (state.secondType) {
      case 'beards' :
          return dispatch(getAllBeards());
      case 'hairstyles' :
          return dispatch(getAllHairstyles());
      default :
        return;
    }
  }, [state.secondType]);

  useEffect(() => {
    dispatch(getAllBarbers());

  }, []);

  useEffect(() => {
    if (success) {
      handleReset()
    }
  }, [success])

  useEffect(async () => {
    if (error || success) {
      const message = error || success;
      const type = error ? "error" : "success";

      dispatch(setSnackbar(type, message));
      dispatch({type: "client/clearData"});
    }

  }, [success, error]);

  return (
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={props.opened}
        onClose={props.handleClose}
        closeAfterTransition
      >
      <div>
        {/*<Snackbar*/}
        {/*    disableWindowBlurListener*/}
        {/*    open={snackOpen}*/}
        {/*    autoHideDuration={3000}*/}
        {/*    variant={error ? "error" : "success"}*/}
        {/*    onClose={handleCloseSnack}*/}
        {/*    message={*/}
        {/*      <div>*/}
        {/*      <span style={{ marginRight: "8px" }}>*/}
        {/*        <Error fontSize="large" color={error ? "error" : "success"} />*/}
        {/*      </span>*/}
        {/*        <span> {error?.toString() || success?.toString()} </span>*/}
        {/*      </div>*/}
        {/*    }*/}
        {/*/>*/}

        <Fade in={props.opened}>
          <Grid className={classes.container}>
            <Typography className={classes.balance}>
              Баланс: {person?.personal?.balance}$
            </Typography>
            <Typography variant="h2" className={classes.title}>
              Оформление заявки
            </Typography>

            <Box display="flex" justifyContent="center" alignItems="center" mt="30px">
              <FormControl sx={{ width: 260 }}>
                <InputLabel id="demo-multiple-name-label">
                  Выберите парикмахера
                </InputLabel>

                <Select
                    input={<OutlinedInput label="Выберите парикмахера" />}
                    onChange={handleChangeBarber}
                    value={state.barberId || ""}
                >
                  <MenuItem value={null}> - </MenuItem>
                    {barbers.map((item) => (
                      <MenuItem key={item._id} value={item._id}>
                        {item?.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>

              {state.barberId &&
              <Tooltip title={'Find out more'}>
                <IconButton onClick={handleToAboutPage}>
                  <ForwardRoundedIcon fontSize={"medium"}/>
                </IconButton>
              </Tooltip>}
            </Box>

            <Box display="flex" justifyContent="center" alignItems="center" mt="30px">
              <FormControl sx={{ width: 260, mt: 1 }}>
                <InputLabel id="demo-multiple-name-label">
                  Желаете дополнить заявку?
                </InputLabel>

                {
                  state.secondType === 'beards' ?
                      (<Select
                          input={<OutlinedInput label="Желаете дополнить заявку?" />}
                          onChange={handleChangeSecondItem}
                          value={state.beard?._id || ""}
                      >
                        <MenuItem value={null}> - </MenuItem>
                        {beardsLoading ? "Идёт загрузка..." :
                            beards.map(item => (
                                <MenuItem key={item._id} value={item._id} >
                                  {item?.name}
                                </MenuItem>
                            ))
                        }
                      </Select>) :

                      (<Select
                          input={<OutlinedInput label="Желаете дополнить заявку?" />}
                          onChange={handleChangeSecondItem}
                          value={state.hairstyle?._id || ""}
                      >
                        <MenuItem value={null}> - </MenuItem>
                        {hairstylesLoading ? "Идёт загрузка..." :
                            hairstyles.map(item => (
                                <MenuItem key={item._id} value={item._id} >
                                  {item?.name}
                                </MenuItem>
                            ))
                        }
                      </Select>)
                }
              </FormControl>

              {
                (state[props.secondType.slice(0, -1)]) &&
                <Tooltip title={'Find out more'}>
                  <IconButton onClick={handleAboutSecondItem} sx={{top: 6}}>
                    <ForwardRoundedIcon fontSize={"medium"}/>
                  </IconButton>
                </Tooltip>
              }
            </Box>

            <Typography variant="h6" className={classes.data}>
              Дата
            </Typography>
            <Box display="flex" justifyContent="center">
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                    renderInput={(params) => <TextField placeholder={'Укажите дату'} {...params} />}
                    value={state.date}
                    onChange={handleChangeDate}
                />
              </LocalizationProvider>
            </Box>

            <Typography variant="h6" className={classes.total}>
              Итого: {state.total || props.firstItem.price}$
            </Typography>

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
