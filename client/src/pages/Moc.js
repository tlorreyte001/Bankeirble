import React from "react";
import API from "../utils/API";
import APIBC from "../utils/APIBlockchain";
import {Button} from "@material-ui/core";

export class Moc extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: localStorage.getItem("token")
        };
    }

    // ------------ Buttons Actions for server calls --------------- //
    checkInfo = async () => {
        try {
            const {data, status} = await API.checkInfo(this.state.user);
            console.log("Code réponse :", status);
            console.log("Body réponse :", data);
        } catch (error) {
            console.error(error);
        }
    };

    addInfo = async () => {
        let address = {
            "adressNumber": 15,
            "street": "avenue du Grand Théatre",
            "postcode": 33000,
            "city": "Bordeaux",
            "other": "Appartement 6"
        };
        let gender = "Homme";
        let birthDate = new Date();
        let birthPlace = "Paris 9ème";
        try {
            const {data, status} = await API.addInfo(this.state.user, address, gender, birthDate, birthPlace);
            console.log("Code réponse :", status);
            console.log("Body réponse :", data);
        } catch (error) {
            console.error(error);
        }
    };

    nbRequest = async () => {
        try {
            const {data, status} = await API.nbRequest(this.state.user);
            console.log("Code réponse :", status);
            console.log("Body réponse :", data);
        } catch (error) {
            console.error(error);
        }
    };

    add = async () => {
        let amount = 560;
        let nbMonths = 12;
        let rate = 2.5;
        let expirationDate = new Date();
        let reimbursementAuto = false;
        try {
            const {data, status} = await API.add_loan(this.state.user, amount, nbMonths, rate, expirationDate, reimbursementAuto);
            console.log("Code réponse :", status);
            console.log("Body réponse :", data);
        } catch (error) {
            console.error(error);
        }
    };

    rate = async () => {
        try {
            const {data, status} = await API.rate(this.state.user);
            console.log("Code réponse :", status);
            console.log("Body réponse :", data);
        } catch (error) {
            console.error(error);
        }
    };

    table = async () => {
        try {
            const {data, status} = await API.table(this.state.user);
            console.log("Code réponse :", status);
            console.log("Body réponse :", data);
        } catch (error) {
            console.error(error);
        }
    };

    accept = async () => {
        try {
            const {data, status} = await API.accept(this.state.user, 0);
            console.log("Code réponse :", status);
            console.log("Body réponse :", data);
        } catch (error) {
            console.error(error);
        }
    };

    delete = async () => {
        try {
            const {data, status} = await API.delete(this.state.user, 0);
            console.log("Code réponse :", status);
            console.log("Body réponse :", data);
        } catch (error) {
            console.error(error);
        }
    };

    contract = async () => {
        try {
            const {data, status} = await API.delete(this.state.user, 0);
            console.log("Code réponse :", status);
            console.log("Body réponse :", data);
        } catch (error) {
            console.error(error);
        }
    };

    // ------------ Buttons Actions for Blockchain calls --------------- //
    loan = () => {
        APIBC.loan();
    };

    loanTable = () => {
        APIBC.loanTable();
    };

    addLoan = () => {
        APIBC.addLoan();
    };

    history = () => {
        APIBC.history();
    };

    render() {
        return (
            <div>
                <Button variant="contained" color="primary" className={"m-3"} onClick={this.checkInfo}>checkInfo</Button>
                <Button variant="contained" color="primary" className={"m-3"} onClick={this.addInfo}>addInfo</Button>
                <Button variant="contained" color="primary" className={"m-3"} onClick={this.nbRequest}>nbRequest</Button>
                <Button variant="contained" color="primary" className={"m-3"} onClick={this.add}>add</Button>
                <Button variant="contained" color="primary" className={"m-3"} onClick={this.rate}>rate</Button>
                <Button variant="contained" color="primary" className={"m-3"} onClick={this.table}>table</Button>
                <Button variant="contained" color="primary" className={"m-3"} onClick={this.accept}>accept</Button>
                <Button variant="contained" color="primary" className={"m-3"} onClick={this.delete}>delete</Button>
                <Button variant="contained" color="primary" className={"m-3"} onClick={this.contract}>contract</Button>

                <Button variant="contained" color="secondary" className={"m-3"} onClick={this.loan}>loan</Button>
                <Button variant="contained" color="secondary" className={"m-3"} onClick={this.loanTable}>loanTable</Button>
                <Button variant="contained" color="secondary" className={"m-3"} onClick={this.addLoan}>addLoan</Button>
                <Button variant="contained" color="secondary" className={"m-3"} onClick={this.history}>history</Button>
            </div>
        );
    }
}