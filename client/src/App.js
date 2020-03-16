import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { Login } from "./components/Login.js";
import { Signup } from "./components/Signup.js";
import { PrivateRoute } from "./components/PrivateRoute.js";
import { Acceuil } from "./pages/Acceuil.js";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <PrivateRoute exact path="/acceuil" component={Acceuil} />
          </Switch>
      </div>
    );
  }
}
export default App;
