import React from "react";
import API from "../utils/API";

import {Button, FormLabel, Slider, Switch} from '@material-ui/core';
import {DateTimePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

export class AddLoan extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            amount: 300,
            num_months: 3,
            expiration_date: new Date(),
            remb_auto: true,
            remb_amount: "",
        };
    };

    send = async () => {
        const {amount, num_months, expiration_date, remb_auto} = this.state;
        try {
            await API.add_loan(localStorage.getItem("token"), amount, num_months, expiration_date, remb_auto);
        } catch (error) {
            console.error(error);
        }
    };

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.checked
        });
    };

    handleDateChange = (date) => {
        this.setState({
            expiration_date: date
        });
    };

    handleChangeSlider = (event, value) => {
        this.setState({
            [event.target.id]: value
        });
    };

    render() {
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
                            id={"num_months"}
                            step={1}
                            valueLabelDisplay="on"
                            min={1}
                            max={12}
                            onChange={this.handleChangeSlider}
                            value={this.state.num_months}
                            color={"secondary"}
                        />
                    </div>

                    <div className={"row pb-3"}>
                        <div className={"col pt-1"}>
                            <FormLabel>Date d'expiration de la demande</FormLabel>
                        </div>
                        <div className={"col"}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <DateTimePicker
                                    value={this.state.expiration_date}
                                    disablePast
                                    onChange={this.handleDateChange}
                                    showTodayButton
                                    maxDate={new Date("2021-01-01")}
                                    color={"secondary"}
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
                                id="remb_auto"
                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                                color="secondary"
                                checked={this.state.remb_auto}
                            />
                        </div>
                    </div>
                    <div className={"row pb-3"}>
                        <FormLabel className={"mx-auto"}>Remboursement de X€ par mois, soit un taux de Y%</FormLabel>
                    </div>
                    <div className={"row"}>
                        <Button className={"mx-auto"} onClick={this.send} variant="contained" color="secondary" type="submit">
                            Envoyer la demande
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}
