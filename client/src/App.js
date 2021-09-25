import {Route, Switch} from "react-router-dom";
import SignUp from "./components/pages/Authorization/SignUp"
import SignIn from "./components/pages/Authorization/Login";
import HomePage from "./components/pages/Home/HomePage";
import AllHairstylesPage from "./components/pages/HairStyles/AllHairstylesPage";
import OneHairStyle from "./components/pages/HairStyles/OneHairStyle";
import AllBeardsPage from './components/pages/Beards/AllBeardsPage';
import OneBeardPage from './components/pages/Beards/OneBeardPage';


function App() {

  return (
      <Switch>
        <Route path={"/signin"} exact component={SignIn} />
        <Route path={"/signup"} exact component={SignUp} />
        <Route path={"/"} exact component={HomePage} />
        <Route path={"/hairstyles"} exact component={AllHairstylesPage} />
        <Route path={"/hairstyles/:id"} exact component={OneHairStyle} />
        <Route path={"/beards"} exact component={AllBeardsPage} />
        <Route path={"/beards/:id"} exact component={OneBeardPage} />
      </Switch>
);

}

export default App;
