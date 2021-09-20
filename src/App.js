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
        <Route exact path="/home" component={HomePage}/>
        <Route exact path="/air" component={Air}/>
        <Route exact path="/water" component={Water}/>
        <Route exact path="/earth" component={Earth}/>
        <Route exact path="/fire" component={Fire}/>
      </Switch>
    </div>
  );
}

export default App;
