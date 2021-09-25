import {Redirect, Route, Switch} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import allRoutesList from "./forAll";
import unauthorizedList from "./forUnauthorized";
import authorizedList from "./forAuthorized";
import {useEffect} from "react";
import {loadUser} from "../redux/feautures/auth";

const Routes = () => {
    const isLoggedIn = useSelector(store => store.auth.isLoggedIn);
    const dispatch = useDispatch();

    useEffect(() => {
        isLoggedIn && dispatch(loadUser())
    }, [isLoggedIn]);

    const authList = isLoggedIn ? authorizedList : unauthorizedList;
    const routesList = [...allRoutesList, ...authList];

    return (
        <Switch>

            {routesList.map(route =>
                <Route
                    key={route.name}
                    path={route.path}
                    exact={route.exact}
                    component={route.component}
                />)}
            <Redirect to="/" />

        </Switch>
    );
};

export default Routes;