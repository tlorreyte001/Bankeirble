import React from 'react';
import {Link} from 'react-router-dom';


export class Formulaire extends React.Component{
  
    
  constructor(props){
    super(props);

    this.state = {
      email: '',
      password: '',
      name: '',
      hasAgreed: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  };

  handleChange(e) {
    let target = e.target;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    let name = target.name;

    this.setState({
      [name]: value
    });
  };

  handleSubmit(e) {
    e.preventDefault();

    console.log('The form was submitted with the following data:');
    console.log(this.state);
  };
  render(){
    return(

      <div className="Formulaire">

      <main>
        <form onSubmit={this.handleSubmit} className="FormFields">
          <div className="FormField">
            <label className="FormField__Label" htmlFor="name">Nom, Prénom</label>
            <input type="text" id="name" className="FormField__Input" placeholder="Entrez votre nom complet" name="name" value={this.state.name} onChange={this.handleChange} />
          </div>
          <div className="FormField">
            <label className="FormField__Label" htmlFor="password">Mot de passe</label>
            <input type="password" id="password" className="FormField__Input" placeholder="Entrez votre mot de passe" name="password" value={this.state.password} onChange={this.handleChange} />
          </div>
          <div className="FormField">
            <label className="FormField__Label" htmlFor="email">E-Mail</label>
            <input type="email" id="email" className="FormField__Input" placeholder="Entrez votre adresse mail" name="email" value={this.state.email} onChange={this.handleChange} />
          </div>

          <div className="FormField">
            <label className="FormField__CheckboxLabel">
                <input className="FormField__Checkbox" type="checkbox" name="hasAgreed" value={this.state.hasAgreed} onChange={this.handleChange} /> J'accepte toutes les <a href="/" className="FormField__TermsLink">conditions d'utilisation</a>
            </label>
          </div>
          <div className="FormField">
                  <button className="FormField__Button mr-20">M'inscrire</button> <Link to="/sign-in" className="FormField__Link">Je suis déjà un utilisateur</Link>
          </div>
        </form>

        <img className="big-circle" src="./img/big-eclipse.svg" alt=""/>
        <img className="med-circle" src="./img/mid-eclipse.svg" alt=""/>
        <img className="sm-circle" src="./img/small-eclipse.svg" alt=""/>

      </main>
    </div>
    );
  }
}