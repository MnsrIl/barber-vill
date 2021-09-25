import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {loadUser} from "./redux/feautures/auth";
import Routes from "./routes";


function App() {
    const isLoggedIn = useSelector(store => store.auth.isLoggedIn);
    const dispatch = useDispatch();

    useEffect(() => {
        isLoggedIn && dispatch(loadUser())
    }, [isLoggedIn]);

    return (
        <Routes />
    );
}

export default App;
