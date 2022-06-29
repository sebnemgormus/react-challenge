import React from "react";
import Home from "./pages/Home"
import Units from "./pages/Units"
import UnitDetails from "./pages/UnitDetail"
import { Route, Switch} from "react-router-dom";


function App() {
  return (
    <>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/units">
            <Units/>
          </Route>
          <Route path="/unitdetail">
            <UnitDetails/>
          </Route>
        </Switch>
    </>
  );
}

export default App;
