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
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import { useSelector, useDispatch } from "react-redux";
import { userAutoLogin } from "./store/utilitySlice";
import Loader from "./components/Loader";

function App() {
  const user = useSelector((state) => state.utilities.user);
  const isLoading = useSelector((state) => state.utilities.isLoading);
  const dispatch = useDispatch();
  console.log(user, isLoading);

  useEffect(() => {
    dispatch(userAutoLogin())
  }, [dispatch]);

  console.log(isLoading);

  return (
    <div className="App">
      <ToolBar />
      {isLoading? <Loader/> :
      <Switch>
        <Route exact path="/login">
          {!user ? <Login /> : <Redirect to="/home" />}
        </Route>
        <Route exact path="/signup">
          {!user ? <Signup /> : <Redirect to="/home" />}
        </Route>
        <Route exact path="/home" component={HomePage} />
        <ProtectedRoute exact path="/air" component={Air} />
        <ProtectedRoute exact path="/water" component={Water} />
        <ProtectedRoute exact path="/earth" component={Earth} />
        <ProtectedRoute exact path="/fire" component={Fire} />
      </Switch>}
    </div>
  );
}

export default App;
