import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { Login } from "./components/Login.js";
import { Signup } from "./components/Signup.js";
import { PrivateRoute } from "./components/PrivateRoute.js";
import { Dashboard } from "./pages/Dashboard.js";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-content">
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
          </Switch>
        </div>
      </div>
    );
  }
}
export default App;
