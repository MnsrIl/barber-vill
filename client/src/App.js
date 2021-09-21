import {Route, Switch} from "react-router-dom";
import SignUp from "./components/pages/Authorization/SignUp"
import SignIn from "./components/pages/Authorization/SignIn";
import HomePage from "./components/pages/HomePage";

function App() {
  return (
      <Switch>
        <Route path={"/signin"} exact component={SignIn} />
        <Route path={"/signup"} exact component={SignUp} />
        <Route path={"/"} exact component={HomePage} />
      </Switch>
);
}

export default App;
