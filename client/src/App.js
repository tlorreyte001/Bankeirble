import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { Login } from "./pages/Login.js";
import { Signup } from "./pages/Signup.js";
import { PrivateRoute } from "./components/PrivateRoute.js";
import { Acceuil } from "./pages/Acceuil.js";
import "./App.css";
import './pages/styleAcceuil.css';
import Welcome from './pages/Welcome';
import Formulaire from './pages/Formulaire';
// import 'bootstrap/dist/css/bootstrap.min.css';


class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-content">
          <Switch>
            <Route exact path="/" component={Welcome} />
            <Route exact path="/formulaire" component={Formulaire} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <PrivateRoute exact path="/acceuil" component={Acceuil} />         
          </Switch>
        </div>
      </div>
    );
  }
}
export default App;
