import React from "react";
import API from "../utils/API";
import {Link} from "react-router-dom";

export class Signup extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      nom:"",
      prenom:"",
      password:"",
      mail_perso:"",
        hasAgreed: false
    };
  }

  send = async () => {
    const { password, mail_perso, nom, prenom, hasAgreed } = this.state;
    if(!hasAgreed){
        return;
    }
    if (!mail_perso || mail_perso.length === 0) {
      return;
    }
    if (!password || password.length === 0) {
      return;
    }
    try {
      const { data } =  await API.signup(mail_perso, password, nom, prenom);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", data.user);
      window.location = "/accueil";
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
    return (
        <div className="text-center mx-auto pt-5" style={{maxWidth: "35em",}}>
          <div className="FormField">
            <label className="FormField__Label" htmlFor="name">Nom</label>
            <input type="text" id="nom" className="FormField__Input" name="name" value={this.state.nom} onChange={this.handleChange} />
          </div>
          <div className="FormField">
            <label className="FormField__Label" htmlFor="name">Prénom</label>
            <input type="text" id="prenom" className="FormField__Input" name="name" value={this.state.prenom} onChange={this.handleChange} />
          </div>
            <div className="FormField">
                <label className="FormField__Label" htmlFor="email">E-Mail</label>
                <input type="email" id="mail_perso" className="FormField__Input" name="email" value={this.state.mail_perso} onChange={this.handleChange} />
            </div>
          <div className="FormField">
            <label className="FormField__Label" htmlFor="password">Mot de passe</label>
            <input type="password" id="password" className="FormField__Input" name="password" value={this.state.password} onChange={this.handleChange} />
          </div>

          <div className="FormField">
            <label className="FormField__CheckboxLabel">
              <input className="FormField__Checkbox" type="checkbox" id="hasAgreed" value={this.state.hasAgreed} onChange={this.handleChange} /> J'accepte toutes les<a href="/" className="FormField__TermsLink">conditions d'utilisation</a>
            </label>
          </div>
          <div className="FormField">
            <button onClick={this.send} className="FormField__Button mr-20">M'inscrire</button> <Link to="/login" className="FormField__Link">Je suis déjà un utilisateur</Link>
          </div>

          <img className="big-circle" src="./img/big-eclipse.svg" alt=""/>
          <img className="med-circle" src="./img/mid-eclipse.svg" alt=""/>
          <img className="sm-circle" src="./img/small-eclipse.svg" alt=""/>
        </div>
    );
  }
}
