import React from "react";
import API from "../utils/API";
import {Link} from "react-router-dom";
import Alert from '@material-ui/lab/Alert';
import {NavbarBankeirble} from "../components/NavbarBankeirble";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Popup from "../components/PopUpConditions";


export class Signup extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      lastName:"", //lastName typed
      firstName:"", //firstName typed
      password:"", //password typed
      email:"", //email typed
        status: "", //Status code of the server response
    };
  }

  //Send the POST request to the server and wait the response.
  send = async () => {
    const { password, email, lastName, firstName } = this.state;
    try {
      const { data, status } =  await API.signup(email, password, lastName, firstName);
        if (status === 200) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", data.user);
            window.location = "/home";
        }
    } catch (error) {
        if (error.response.status !== 200){
            this.setState({status: error.response.status})
        }
    }
  };

  //Taking note of what is typed
  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  render() {

      //Message PopUp red
      let alertPopUp = null;
      if (this.state.status === 405){
          alertPopUp = <Alert className={"mb-3"} severity="error">Cette adresse mail est déjà liée à un compte !</Alert>
      }

    return (
        <div>
            <NavbarBankeirble welcome={true}/>
            <Container className={"pt-5"}>
                <Paper className="text-center mx-auto pt-5" style={{maxWidth: "35em",}}>
                    {alertPopUp}
                  <div className="FormField">
                    <label className="FormField__Label" htmlFor="name">Nom</label>
                    <input type="text" id="lastName" className="FormField__Input" value={this.state.lastName} onChange={this.handleChange} />
                  </div>
                  <div className="FormField">
                    <label className="FormField__Label" htmlFor="name">Prénom</label>
                    <input type="text" id="firstName" className="FormField__Input" value={this.state.firstName} onChange={this.handleChange} />
                  </div>
                    <div className="FormField">
                        <label className="FormField__Label" htmlFor="email">E-Mail</label>
                        <input type="email" id="email" className="FormField__Input" value={this.state.email} onChange={this.handleChange} />
                    </div>
                  <div className="FormField">
                    <label className="FormField__Label" htmlFor="password">Mot de passe</label>
                    <input type="password" id="password" className="FormField__Input" value={this.state.password} onChange={this.handleChange} />
                  </div>

                  <div className="FormField">
                    <label className="FormField__CheckboxLabel">
                      <input className="FormField__Checkbox" type="checkbox" id="hasAgreed" value={this.state.hasAgreed} onChange={this.handleChange} /> J'accepte toutes les <Popup /> 

                    </label>
                  </div>
                  <div className="FormField pb-5">
                    <button onClick={this.send} className="FormField__Button mr-20">M'inscrire</button> <Link to="/login" className="FormField__Link">Je suis déjà un utilisateur</Link>
                  </div>
                </Paper>
            </Container>
        </div>
    );
  }
}
