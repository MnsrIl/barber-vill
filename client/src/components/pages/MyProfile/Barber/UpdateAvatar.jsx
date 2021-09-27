import {FormControlLabel} from "@mui/material";
import classNames from "classnames";
import avatarImage from "../../../../image/avatar-hello.jpg";
import {Tooltip} from "@material-ui/core";
import {useEffect, useState} from "react";
import {updateAvatar} from "../../../../redux/feautures/auth";
import {useDispatch, useSelector} from "react-redux";
import {useSnackbar} from "notistack";

const UpdateAvatar = ({person, useStyles}) => {
  const [avatar, setAvatar] = useState("");
  const {enqueueSnackbar, closeSnackbar} = useSnackbar();
  const {success, error} = useSelector(store => store.auth);

  useEffect(() => {
    if (error || success) {
      enqueueSnackbar(success || error, {variant: success ? "success" : "error"});
    }
  }, [success, error])

  const classes = useStyles();
  const dispatch = useDispatch();

  const imageClasses = classNames(classes.imgRaised, classes.imgRoundedCircle, classes.imgFluid);
  const imgSrc = avatar?.length ? URL.createObjectURL(avatar[0]) : person.personal?.avatar || avatarImage;

  const handleChange = (e) => {
    setAvatar(e.target.files);
  }

  const handleSubmit = () => {
    dispatch(updateAvatar(avatar));
  }

  return (
        <FormControlLabel
            sx={{mr: -1}}
            control={<input type="file" accept="image/*" style={{display: "none"}} />}
            onChange={handleChange}
            classes={{root: classes.rootLabel}}
            label={!!avatar.length ?
              (<Tooltip
                  interactive
                  placement={"top"}
                  classes={{tooltip: classes.tooltip}}
                  title={<span onClick={handleSubmit} >Сохранить изменения</span>}
              >
                  <img src={imgSrc} alt="avatar" className={imageClasses} />
              </Tooltip>)
              :
              (<Tooltip
                  title={"Желаете изменить аватарку?"}
                  placement={"top"}
                  classes={{tooltip: classes.tooltip}}
              >
                  <img src={imgSrc} alt="avatar" className={imageClasses} />
              </Tooltip>)}
        />
  );
};

export default UpdateAvatar;