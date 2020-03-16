import React from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import API from "../utils/API";

export class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nom:"",
      prenom:"",
      password:"",
      mail_perso:"",
    };
  }

  send = async () => {
    const { password, mail_perso, nom, prenom } = this.state;
    if (!mail_perso || mail_perso.length === 0) {
      return;
    }
    if (!password || password.length === 0) {
      return;
    }
    try {
      const { data } =  await API.signup(mail_perso, password, nom, prenom);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      window.location = "/acceuil";
    } catch (error) {
      console.error(error);
    }
  };

  change = () => {
    window.location = "/";
  };

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  render() {
    const { mail_perso, password, nom, prenom } = this.state;
    return (
        <div className={"container-fluid text-center Login"}>
          <div className={"col"}>
            <div className={"mx-auto pt-5"} style={{maxWidth: "25%"}}>
              <h3>Inscription</h3>
              <FormGroup controlId="nom">
                <FormLabel>Nom</FormLabel>
                <FormControl
                    autoFocus
                    type="input"
                    value={nom}
                    onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup controlId="prenom">
                <FormLabel>Prénom</FormLabel>
                <FormControl
                    autoFocus
                    type="input"
                    value={prenom}
                    onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup controlId="mail_perso">
                <FormLabel>E-mail</FormLabel>
                <FormControl
                    autoFocus
                    type="email"
                    value={mail_perso}
                    onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup controlId="password">
                <FormLabel>Mot de passe</FormLabel>
                <FormControl
                    value={password}
                    onChange={this.handleChange}
                    type="password"
                />
              </FormGroup>
              <Button onClick={this.send} block type="submit">
                S'inscrire
              </Button>
              <Button onClick={this.change} block type="submit">
                Se connecter
              </Button>
            </div>
          </div>
        </div>
    );
  }
}
