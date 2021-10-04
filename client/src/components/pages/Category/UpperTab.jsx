import {Box, Tab} from '@mui/material';
import {TabContext, TabList, TabPanel} from '@mui/lab';
import {useState} from "react";
import LeftTab from "./LeftTab";
import {useHistory} from "react-router-dom";
import useQuery from "../../../hooks/useQuery";
import { useSelector } from 'react-redux';

function UpperTab() {
    const gender = useQuery("gender") || "М";
    const [value, setValue] = useState(gender);
    const { text } = useSelector((store) => store.languages);

    const history = useHistory();
    const handleChange = (event, newValue) => {
        history.push(`/hairstyles?gender=${newValue}`)
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%', typography: 'body1'}}>
            <TabContext value={value}>
                <Box sx={{backgroundColor:"#1b2735", p:2 }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example" >
                        <Tab label={text.men} value="М" style={{color:"white"}}/>
                        <Tab label={text.woman} value="Ж" style={{color:"white"}}/>
                    </TabList>
                </Box>
                <TabPanel value="М" style={{padding:0}}>
                    <LeftTab />
                </TabPanel>
                <TabPanel value="Ж" style={{padding:0}}>
                    <LeftTab />
                </TabPanel>
            </TabContext>
        </Box>
    );
}

export default UpperTab;