import UpperTab from "./UpperTab";
import Header from "../Header";
import {useLocation} from "react-router-dom";
import LeftTab from "./LeftTab";
import {useEffect} from "react";

const Category = () => {
    const location = useLocation()

    useEffect(() => console.log(location.pathname), []);

    return (
        <>
            <Header />
            {location.pathname === '/hairstyles' ? <UpperTab /> : <LeftTab type={'beards'} />}
        </>
    );
};

export default Category;