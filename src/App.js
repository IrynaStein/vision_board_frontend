import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import { useEffect } from "react";
import ToolBar from "./components/ToolBar";
import HomePage from "./pages/HomePage";
import Air from "./pages/Air";
import Fire from "./pages/Fire";
import Earth from "./pages/Earth";
import Water from "./pages/Water";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import { useSelector, useDispatch } from "react-redux";
import { userAutoLogin } from "./store/utilitySlice";
function App() {
  const user = useSelector((state) => state.utilities.user);
  const dispatch = useDispatch();
  //Add auto-login here to fetch user info and set user based on session in progress

  useEffect(() => {
    dispatch(userAutoLogin());
  }, [dispatch]);

  return (
    <div className="App">
      <ToolBar />
      <Switch>
        <Route exact path="/home" component={HomePage} />
        <Route exact path="/login">
          {!user ? <Login /> : <Redirect to="/home" />}
        </Route>
        <ProtectedRoute exact path="/air" component={Air} />
        <Route exact path="/water" component={Water} />
        {/* Water ^^^ is a demo component that works without userAuth. Maybe this will change depending on the "unlock" logic for the rest of the components*/}
        <ProtectedRoute exact path="/earth" component={Earth} />
        <ProtectedRoute exact path="/fire" component={Fire} />
      </Switch>
    </div>
  );
}

export default App;
