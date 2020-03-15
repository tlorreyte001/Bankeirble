import React from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import API from "../utils/API";

export class Signup extends React.Component {
  state = {
    gender:"",
    first_name:"",
    last_name:"",
    password:"",
    num:"",
    street:"",
    zip:"",
    city:"",
    comp:"",
    tel:"",
    mail_perso:"",
    birth_date:"",
    birth_city:""
  };
  send = async () => {
    const { password, mail_perso } = this.state;
    if (!mail_perso || mail_perso.length === 0) {
      return;
    }
    if (!password || password.length === 0) {
      return;
    }
    try {
      const { data } =  await API.signup(mail_perso, password);
      localStorage.setItem("token", data.token);
      window.location = "/dashboard";
    } catch (error) {
      console.error(error);
    }
  };

  change = () => {
    window.location = "/";
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };
  render() {
    const { mail_perso, password } = this.state;
    return (
      <div className="Signup">
        <FormGroup controlId="mail_perso" bsSize="large">
          <ControlLabel>Email</ControlLabel>
          <FormControl
            autoFocus
            type="email"
            value={mail_perso}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <ControlLabel>Password</ControlLabel>
          <FormControl
            value={password}
            onChange={this.handleChange}
            type="password"
          />
        </FormGroup>
        <Button onClick={this.send} block bsSize="large" type="submit">
          S'inscrire
        </Button>
        <Button onClick={this.change} block bsSize="large" type="submit">
          Login
        </Button>
      </div>
    );
  }
}
