import React from "react";

import {Button, FormLabel, Slider, Switch} from '@material-ui/core';
import {DateTimePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import frLocale from "date-fns/locale/fr";

import {PopUpForm} from "../components/PopUpForm";
import API from "../utils/API";
import APIBC from "../utils/APIBlockchain";


export class AddLoan extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            amount: 300,
            nbMonths: 3,
            rate: 1,
            expirationDate: new Date(),
            reimbursementAuto: true,
            reimbursementAmount: "",
            openPopUp: false,
            nbRequest: ""
        };
    };

    componentDidMount() {
        this.nbLoanRequest();
        this.blockchainLoan();
    }

    nbLoanRequest = async () => {
        try {
            const {status, data} = await API.nbRequest(localStorage.getItem("token"));
            if (status === 200) {
                this.setState({nbRequest: data.nbLoanRequest});
            }
        } catch (error) {
            console.error(error);
        }
    };

    blockchainLoan = () => {
        APIBC.loan();
    };

    handleClickOpen = () => {
        this.setState({openPopUp: true});
    };

    handleClose = () => {
        this.setState({openPopUp: false});
    };

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.checked
        });
    };

    handleDateChange = (date) => {
        this.setState({
            expirationDate: date
        });
    };

    handleChangeSlider = (event, value) => {
        this.setState({
            [event.target.id]: value
        });
    };

    render() {
        let data = this.state;
        return (
            <div className="Loan">
                <div className={"mx-auto"} style={{maxWidth: "30em",}}>
                    <h4>Faire une demande de prêt</h4>
                    <div className={"row py-4"}>
                        <FormLabel>Montant du prêt</FormLabel>
                    </div>
                    <div className={"row pb-4 pt-2"}>
                        <Slider
                            aria-labelledby="discrete-slider-always"
                            id={"amount"}
                            step={25}
                            valueLabelDisplay="on"
                            min={50}
                            max={700}
                            onChange={this.handleChangeSlider}
                            value={this.state.amount}
                            color={"secondary"}
                        />
                    </div>
                    <div className={"row pb-4"}>
                        <FormLabel>Nombre de mensualités</FormLabel>
                    </div>
                    <div className={"row pb-3 pt-2"}>
                        <Slider
                            aria-labelledby="discrete-slider-always"
                            id={"nbMonths"}
                            step={1}
                            valueLabelDisplay="on"
                            min={1}
                            max={12}
                            onChange={this.handleChangeSlider}
                            value={this.state.nbMonths}
                            color={"secondary"}
                        />
                    </div>

                    <div className={"row pb-3"}>
                        <div className={"col pt-1"}>
                            <FormLabel>Date d'expiration de la demande</FormLabel>
                        </div>
                        <div className={"col"}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={frLocale}>
                                <DateTimePicker
                                    value={this.state.expirationDate}
                                    disablePast
                                    onChange={this.handleDateChange}
                                    showTodayButton
                                    maxDate={new Date("2021-01-01")}
                                    color={"secondary"}
                                    format="dd MMMM yyyy HH:mm"
                                    ampm={false}
                                />
                            </MuiPickersUtilsProvider>
                        </div>
                    </div>
                    <div className={"row pb-4"}>
                        <div className={"col pt-1"}>
                            <FormLabel>Remboursement automatique via Paypal</FormLabel>
                        </div>
                        <div className={"col"}>
                            <Switch
                                onChange={this.handleChange}
                                id="reimbursementAuto"
                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                                color="secondary"
                                checked={this.state.reimbursementAuto}
                            />
                        </div>
                    </div>
                    <div className={"row pb-3"}>
                        <div className={"mx-auto"}>
                            <FormLabel>Remboursement de</FormLabel> <FormLabel style={{color: "rgb(211,99,98)",}}>{this.state.amount}€</FormLabel> <FormLabel>par mois, soit un taux de</FormLabel> <FormLabel style={{color: "rgb(211,99,98)",}}>Y%</FormLabel>
                        </div>
                    </div>
                    <div className={"row"}>
                        <Button className={"mx-auto"} onClick={this.handleClickOpen} variant="contained" color="secondary" type="submit">
                            Envoyer la demande
                        </Button>
                    </div>
                    <PopUpForm open={this.state.openPopUp} onClose={this.handleClose} data={data}/>
                </div>
            </div>
        );
    }
}
