import {FormControlLabel} from "@mui/material";
import classNames from "classnames";
import avatarImage from "../../../../image/avatar-hello.jpg";
import {Tooltip} from "@material-ui/core";
import {useEffect, useState} from "react";
import {updateAvatar} from "../../../../redux/feautures/auth";
import {useDispatch, useSelector} from "react-redux";

const UpdateAvatar = ({person, useStyles}) => {
  const [avatar, setAvatar] = useState("");

  const classes = useStyles();
  const dispatch = useDispatch();

  const imageClasses = classNames(classes.imgRaised, classes.imgRoundedCircle, classes.imgFluid);
  const imgSrc = avatar?.length ? URL.createObjectURL(avatar[0]) : person.personal?.avatar || avatarImage;

  const handleChange = (e) => {
    setAvatar(e.target.files);
  }

  const handleSubmit = async () => {
    await dispatch(updateAvatar(avatar));
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