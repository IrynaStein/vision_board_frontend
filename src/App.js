import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import ToolBar from "./components/ToolBar";
import HomePage from "./pages/HomePage";
import Air from "./pages/Air";
import Fire from "./pages/Fire";
import Earth from "./pages/Earth";
import Water from "./pages/Water";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import {useSelector} from "react-redux"
function App() {
const user = useSelector(state => state.utilities.user)
  return (
    <div className="App">
      <ToolBar />
      <Switch>
        <Route exact path="/home" component={HomePage}/>
        <Route exact path="/login">
          {!user ? <Login/> : <Redirect to='/home'/>}
          </Route>
        <ProtectedRoute exact path="/air" component={Air}/>
        {/* Water is a demo component that works without userAuth */}
        <Route exact path="/water" component={Water}/>
        <ProtectedRoute exact path="/earth" component={Earth}/>
        <ProtectedRoute exact path="/fire" component={Fire}/>
      </Switch>
    </div>
  );
}

export default App;
