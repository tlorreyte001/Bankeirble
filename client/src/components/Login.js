import React from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import API from "../utils/API";

export class Login extends React.Component {
  state = {
    mail_perso: "",
    password: ""
  };
  send = async () => {
    const { mail_perso, password } = this.state;
    if (!mail_perso || mail_perso.length === 0) {
      return;
    }
    if (!password || password.length === 0) {
      return;
    }
    try {
        const { data } = await API.login(mail_perso, password);
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        window.location = "/acceuil";
    } catch (error) {
      console.error(error);
    }
  };

  change = () => {
    window.location = "/signup";
  };

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  render() {
    const { mail_perso, password } = this.state;
    return (
      <div className="Login">
        <FormGroup controlId="mail_perso" bsSize="large">
          <FormLabel>Email</FormLabel>
          <FormControl
            autoFocus
            type="email"
            value={mail_perso}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <FormLabel>Password</FormLabel>
          <FormControl
            value={password}
            onChange={this.handleChange}
            type="password"
          />
        </FormGroup>
        <Button onClick={this.send} block bsSize="large" type="submit">
          Connexion
        </Button>
        <Button onClick={this.change} block bsSize="large" type="submit">
          Or Signup
        </Button>
      </div>
    );
  }
}
