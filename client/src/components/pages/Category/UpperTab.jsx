import {Box, Tab} from '@mui/material';
import {TabContext, TabList, TabPanel} from '@mui/lab';
import {useState} from "react";
import LeftTab from "./LeftTab";
import {useHistory} from "react-router-dom";
import useQuery from "../../../hooks/useQuery";

function UpperTab() {
    const gender = useQuery("gender") || "М";
    const [value, setValue] = useState(gender);

    const history = useHistory();
    const handleChange = (event, newValue) => {
        history.push(`/hairstyles?gender=${newValue}`)
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="Мужские" value="М" />
                        <Tab label="Женские" value="Ж" />
                    </TabList>
                </Box>
                <TabPanel value="М">
                    <LeftTab />
                </TabPanel>
                <TabPanel value="Ж">
                    <LeftTab />
                </TabPanel>
            </TabContext>
        </Box>
    );
}

export default UpperTab;