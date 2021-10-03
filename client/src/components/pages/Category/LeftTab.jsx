import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import AllHairstylesPage from "../HairStyles/AllHairstylesPage";
import { useDispatch, useSelector } from "react-redux";
import { loadCategories } from "../../../redux/feautures/categories";
import useQuery from "../../../hooks/useQuery";
import CircularProgress from "@material-ui/core/CircularProgress";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

function VerticalTabs(props) {
  const [value, setValue] = useState(0);
  const categories = useSelector((store) => store.categories.allCategories);
  const loading = useSelector((store) => store.categories.loading);

  const dispatch = useDispatch();
  const gender = useQuery("gender");

  useEffect(() => {
    dispatch(loadCategories(gender));
  }, [gender, dispatch]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box display="flex">
      <Box sx={{ flexGrow: 1,backgroundColor:'#1b2735', display: "flex",pl:2}}>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: "divider", }}
        >
          <Tab label="Все" {...a11yProps(0)} style={{color:"white"}}/>
          {loading ? (
            <Box textAlign="center">
              <CircularProgress />
            </Box>
          ) : (
            categories.map((item, index) => (
              <Tab label={item.name} key={item._id} {...a11yProps(index + 1)} style={{color:"white"}} />
            ))
          )}
        </Tabs>
      </Box>
      <Box>
        <TabPanel value={value} index={0}>
          <AllHairstylesPage />
        </TabPanel>
        {categories?.map((item, index) => (
          <TabPanel key={item._id} value={value} index={index + 1}>
            <AllHairstylesPage categoryId={item._id} />
          </TabPanel>
        ))}
      </Box>
    </Box>
  );
}

export default VerticalTabs;
