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
  Button,
} from "@mui/material";
import { makeStyles, TextField, Typography } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import { useDispatch, useSelector } from "react-redux";
import { getAllBarbers } from "../../../redux/feautures/barbers";
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

  const { barbers } = useSelector((store) => store.barbers);

  const classes = useStyles();

  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const [value, setValue] = React.useState(
    new Date("2021-01-01T00:00:00.000Z")
  );

  React.useEffect(() => {
    dispatch(getAllBarbers());
  }, [dispatch]);

  return (
    <div>
      <Button onClick={handleOpen}>Оставить заявку</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
      >
        <Fade in={open}>
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
                  <Collapse in={open} timeout="auto" unmountOnExit>
                    {barbers.map((item) => (
                      <List component="div" disablePadding>
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
                  value={value}
                  onChange={(newValue) => {
                    setValue(newValue);
                  }}
                />
              </LocalizationProvider>
            </Box>
            <Box className={classes.sendBtn}>
            <Button variant="contained" size="large" color="primary">Отправить</Button>
            </Box>
          </Grid>
        </Fade>
      </Modal>
    </div>
  );
}

export default ModalPage;
