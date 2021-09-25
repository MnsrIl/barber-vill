import {Redirect, Route, Switch} from "react-router-dom";
import {useSelector} from "react-redux";
import allRoutesList from "./forAll";
import unauthorizedList from "./forUnauthorized";
import authorizedList from "./forAuthorized";

const Routes = () => {
    const isLoggedIn = useSelector(store => store.auth.isLoggedIn);

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