import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { Login } from "./pages/Login.js";
import { Signup } from "./pages/Signup.js";
import { PrivateRoute } from "./components/PrivateRoute.js";
import { Acceuil } from "./pages/Acceuil.js";
import "./App.css";
// import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route exact path="/sign-in" component={Login} />
                    <Route exact path="/sign-up" component={Signup} />
                    <PrivateRoute exact path="/acceuil" component={Acceuil} />
                </Switch>
            </div>
        );
    }
}
export default App;
