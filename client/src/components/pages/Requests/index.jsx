import React, {useState} from "react";
import {
    AppBar,
    Button,
    Dialog,
    Divider, Fab, Fade,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Slide, TextField,
    Toolbar,
    Typography
} from "@mui/material";
import {Close} from "@mui/icons-material";
import {DateTimePicker} from "@mui/lab";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction={"down"} ref={ref} {...props} />;
});

function Requests() {
    const [open, setOpen] = useState(false);
    const [openDate, setOpenDate] = useState(false);
    const [date, setDate] = useState(new Date(Date.now()));

    const handleDateChange = (date_) => {
        setDate(date_);
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpenDate = () => {
        setOpenDate(!openDate);
    }

    return (
        <Fab
            variant="extended"
            size="small"
            aria-label="add"
            onClick={handleClickOpen}
        >
            Заказать
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <Close />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Sound
                        </Typography>
                        <Button autoFocus color="inherit" onClick={handleClose}>
                            save
                        </Button>
                    </Toolbar>
                </AppBar>
                <List>
                    <ListItem>
                        <ListItemText primary="Phone ringtone" secondary="Titania" />
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemText primary="Datetime Picker" secondary={`${date}`} button onClick={() => handleOpenDate()} />

                        <DateTimePicker
                            open={openDate}
                            renderInput={(props) => <TextField style={{display: "none"}} {...props} />}
                            value={date}
                            onAccept={() => handleOpenDate()}
                            onChange={(newValue) => {
                                handleDateChange(newValue);
                            }}
                        />
                    </ListItem>
                </List>
            </Dialog>
        </Fab>
    );
}

export default Requests;