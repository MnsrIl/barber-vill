import {Route, Switch} from "react-router-dom";
import SignUp from "./components/pages/Authorization/SignUp"
import SignIn from "./components/pages/Authorization/SignIn";
import HomePage from "./components/pages/HomePage";
import AllHairstylesPage from "./components/pages/HairStyles/AllHairstylesPage";

function App() {
  return (
      <Switch>
        <Route path={"/signin"} exact component={SignIn} />
        <Route path={"/signup"} exact component={SignUp} />
        <Route path={"/"} exact component={HomePage} />
        <Route path={"/hairstyles"} exact component={AllHairstylesPage} />
      </Switch>
);
}

export default App;
