import {Box, Tab} from '@mui/material';
import {TabContext, TabList, TabPanel} from '@mui/lab';
import {useState} from "react";
import LeftTab from "./LeftTab";

function UpperTab() {
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Мужские" value="1" />
              <Tab label="Женские" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <LeftTab gender="М" />
          </TabPanel>
          <TabPanel value="2">
            <LeftTab gender="Ж" />
          </TabPanel>
        </TabContext>
      </Box>
  );
}

export default UpperTab;