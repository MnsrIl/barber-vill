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
import {NavLink, useHistory, useLocation} from "react-router-dom";
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

  const location = useLocation();

  //Getting first item type by checking location.pathname. If it's equal to 'hairstyle',
  //then the other one will be equal to 'beard' && vice versa
  const [types, setTypes] = useState({
    firstItem: location.pathname.split('/')[1].slice(0, -1),
    secondItem: location.pathname.split('/')[1].slice(0, -1) === 'hairstyle' ? 'beard' : 'hairstyle',
  })
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const [state, setState] = useState({
    date: null,
    beard: "",
    hairstyle: "",
    barberId: null,
    secondType: "", //can be only 'beards' or 'hairstyles'
    total: 0
  });

  useEffect(() => {
    setState({...state, [types.firstItem]: props.firstItem, total: props.firstItem.price});
  }, [props.firstItem])

  const handleChangeBarber = (e) => {
    setState({...state, barberId: e.target.value})
  }

  const handleChangeSecondItem = (e) => {
    const firstItem = state[types.firstItem]
    const secondItemsArray = types.secondItem === 'hairstyle' ? hairstyles : beards;
    const secondItem = secondItemsArray.find(item => item._id === e.target.value);

    return setState({...state,
      [types.secondItem]: secondItem,
      total: (secondItem?.price || 0) + firstItem.price
    });
  }

  const handleReset = () => {
    setState({...state, date: null, total: state[types.firstItem].price, [types.secondItem] : null, barberId: null});
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

  const handleToAboutPage = () => {
    window.open(`/barber/${state.barberId}`, "_blank").focus();
  }

  const handleAboutSecondItem = () => {
    const item = types.secondItem;
    const url = `/${item}s/` + state[item]._id;
    window.open(url, "_blank").focus();
  }

  useEffect(() => {
    switch (types.secondItem) {
      case 'beard' :
          return dispatch(getAllBeards());
      case 'hairstyle' :
          return dispatch(getAllHairstyles());
      default :
        return;
    }
  }, [types.secondItem]);

  //Loading all barbers, by opening this window
  useEffect(() => {
      dispatch(getAllBarbers());
  }, []);

  //If we have an error or success, the snackbar has display
  useEffect( () => {
    if (error || success) {
      const message = error || success;
      const type = error ? "error" : "success";

      dispatch(setSnackbar(type, message));
      if (success) {
        handleReset();
      }
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
                </Tooltip>
              }
            </Box>

            <Box display="flex" justifyContent="center" alignItems="center" mt="30px">
              <FormControl sx={{ width: 260, mt: 1 }}>
                <InputLabel id="demo-multiple-name-label">
                  Желаете дополнить заявку?
                </InputLabel>
                <Select
                    input={<OutlinedInput label="Желаете дополнить заявку?" />}
                    onChange={handleChangeSecondItem}
                    value={state[types.secondItem]?._id || ""}
                >
                  <MenuItem value={""}> - </MenuItem>
                  {
                    (beardsLoading || hairstylesLoading) ?
                        "Идёт загрузка..." :
                      (types.secondItem === 'beard' ? beards : hairstyles)
                          .map(item => (
                              <MenuItem key={item._id} value={item._id}>
                                {item?.name}
                              </MenuItem>
                      ))
                  }
              </Select>
              </FormControl>

              {
                (state[types.secondItem]) &&
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
              Итого: {state.total}$
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
