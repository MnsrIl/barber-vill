import {Route, Switch} from "react-router-dom";
import SignUp from "./components/pages/Authorization/SignUp"
import SignIn from "./components/pages/Authorization/Login";
import HomePage from "./components/pages/Home/HomePage";
import AllHairstylesPage from "./components/pages/HairStyles/AllHairstylesPage";
import OneHairStyle from "./components/pages/HairStyles/OneHairStyle";
import AllBeardsPage from './components/pages/Beards/AllBeardsPage';
import OneBeardPage from './components/pages/Beards/OneBeardPage';
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {loadUser} from "./redux/feautures/auth";
import AllBarbersPage from "./components/pages/barbers/AllBarbersPage";


function App() {
    const isLoggedIn = useSelector(store => store.auth.isLoggedIn);
    const dispatch = useDispatch();

    useEffect(() => {
        isLoggedIn && dispatch(loadUser())
    }, [isLoggedIn]);

    return (
        <Switch>
            <Route path={"/login"} exact component={SignIn} />
            <Route path={"/signup"} exact component={SignUp} />
            <Route path={"/"} exact component={HomePage} />
            <Route path={"/hairstyles"} exact component={AllHairstylesPage} />
            <Route path={"/hairstyles/:id"} exact component={OneHairStyle} />
            <Route path={"/beards"} exact component={AllBeardsPage} />
            <Route path={"/beards/:id"} exact component={OneBeardPage} />
            <Route path={"/barbers"} exact component={AllBarbersPage}/>
        </Switch>
    );
}

export default App;
