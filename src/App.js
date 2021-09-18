import "./App.css";
import { Route, Switch } from "react-router-dom";
import ToolBar from "./components/ToolBar";
import HomePage from "./pages/HomePage";
import Air from "./pages/Air";
import Fire from "./pages/Fire";
import Earth from "./pages/Earth";
import Water from "./pages/Water";

function App() {
  return (
    <div className="App">
      <ToolBar />
      <Switch>
        <Route exact path="/home">
          <HomePage />
        </Route>
        <Route exact path="/air">
          <Air />
        </Route>
        <Route exact path="/water">
          <Water />
        </Route>
        <Route exact path="/earth">
          <Earth />
        </Route>
        <Route exact path="/fire">
          <Fire />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
