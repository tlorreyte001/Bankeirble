import React from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import API from "../utils/API";


export class AddLoan extends React.Component {
  state = {
    amount: "",
    num_months: "",
    expiration_date: ""
  };
  send = async () => {
    const {amount, num_months, expiration_date} = this.state;
    try {
      await API.add_loan(localStorage.getItem("token"), amount, num_months, expiration_date);
    } catch (error) {
      console.error(error);
    }
  };
  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  loans = async () => {
    await API.get_loans();
    // Exemple res.data.loans[0].montant = premier montant
    // for (let i = 0, l = prets.length; i < l; i++) {
    //     pret = prets[i];
    //     console.log('------------------------------');
    //     console.log('Montant : ' + pret.montant);
    //     console.log('------------------------------');
    // }
  };

  logout = () => {
    localStorage.clear();
    window.location = "/";
  };

  render() {
    const {amount, num_months, expiration_date} = this.state;
    return (
      <div className="Loan">
        <FormGroup controlId="amount" bsSize="large">
          <ControlLabel>Montant du prêt</ControlLabel>
          <FormControl
            autoFocus
            type="amount"
            value={amount}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup controlId="num_months" bsSize="large">
          <ControlLabel>Nombre de mensualités</ControlLabel>
          <FormControl
            value={num_months}
            onChange={this.handleChange}
            type="num_months"
          />
        </FormGroup>
        <FormGroup controlId="expiration_date" bsSize="large">
          <ControlLabel>Date d'expiration de la demande</ControlLabel>
          <FormControl
            value={expiration_date}
            onChange={this.handleChange}
            type="expiration_date"
          />
        </FormGroup>
        <Button onClick={this.send} block bsSize="large" type="submit">
          Envoyer
        </Button>
        <Button onClick={this.logout} block bsSize="large" type="submit">
          Logout
        </Button>
      </div>
    );
  }
}