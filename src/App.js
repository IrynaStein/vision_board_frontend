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
import { boardActions, getStickers } from "./store/boardSlice";
import { utilityActions } from "./store/utilitySlice";
import Loader from "./components/Loader";
import WorkBench from "./components/WorkBench";


function App() {
  const user = useSelector((state) => state.utilities.user);
  const isLoading = useSelector((state) => state.utilities.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch('/profile', {
      method: "GET"
    })
    .then((resp) => {
      if (resp.ok){
        resp.json().then( data => {
          dispatch(utilityActions.setUser(data.user))
      dispatch(boardActions.setUserBoards(data.user.boards))
      dispatch(utilityActions.setInitialQuotes(data.quotes))
      dispatch(utilityActions.toogleLoading(false))
        })
    }
    else{
      dispatch(utilityActions.toogleLoading(false))
    }})
    dispatch(getStickers())
  }, [dispatch]);


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
        <ProtectedRoute exact path="/:element/:id" component={WorkBench}/>
      </Switch>}
    </div>
  );
}

export default App;
