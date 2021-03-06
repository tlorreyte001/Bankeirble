import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { Login } from "./pages/Login.js";
import { Signup } from "./pages/Signup.js";
import { PrivateRoute } from "./components/PrivateRoute.js";
import { Home } from "./pages/Home.js";
import "./App.css";
import './pages/styleAcceuil.css';
import {Welcome} from './pages/Welcome.js';
import { createMuiTheme, ThemeProvider  } from '@material-ui/core/styles';
import {Loans} from "./pages/Loans";
import {Moc} from "./pages/Moc";
import {BlockChain} from "./pages/Blockchain"
import {Dashboard} from "./pages/Dashboard";
import MiniDrawer from './components/test';
import HistoryTable from "./components/HistoryTable";
import TestHistoryTable from "./components/testHistoryTable";


class App extends Component {
  render() {

    const theme = createMuiTheme({
      palette: {
        primary: {
          light: '#e69f4a',
          main: '#e0881d',
          dark: '#9c5f14',
          contrastText: '#fff',
        },
        secondary: {
          light: '#db828b',
          main: '#d3636e',
          dark: '#93454d',
          contrastText: '#fff',
        },
      },
      typography: {
        htmlFontSize: 16,
        fontFamily: "Manrope VF",
        fontSize: 14,
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightBold: 700,
      }
    });

    return (
      <div className="">
        <div className="">
          <ThemeProvider theme={theme}>
            <Switch>
              <Route exact path="/" component={Welcome} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <PrivateRoute exact path="/home" component={Home} />
              <Route exact path="/dashboard" component={MiniDrawer} />
              <Route exact path="/historyTable" component={HistoryTable} />
              <Route exact path="/testhistoryTable" component={TestHistoryTable} />
              <PrivateRoute exact path="/loans" component={Loans} />
              <PrivateRoute exact path="/test" component={Moc} />
              <PrivateRoute exact path="/blockchain" component={BlockChain} />
              {/* <PrivateRoute exact path="/dashboard" component={Dashboard} /> */}
            
            </Switch>
          </ThemeProvider>
        </div>
      </div>
    );
  }
}
export default App;
