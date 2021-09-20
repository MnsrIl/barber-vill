import {Route, Switch} from "react-router-dom";
import SignUp from "./components/pages/Authorization/SignUp"
import SignIn from "./components/pages/Authorization/SignIn";

function App() {
  return (
      <Switch>
        <Route path={"/signin"} exact component={SignIn} />
        <Route path={"/signup"} exact component={SignUp} />
      </Switch>
);
}

export default App;
