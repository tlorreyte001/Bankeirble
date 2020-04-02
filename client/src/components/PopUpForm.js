import React from "react";

import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormLabel} from '@material-ui/core';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Switch from "@material-ui/core/Switch";
import API from "../utils/API";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import DateFnsUtils from "@date-io/date-fns";
import frLocale from "date-fns/locale/fr";
import {DatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";

export class PopUpForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            form: false,
            checked: false,

            address:{
                addressNumber: "",
                postcode: "",
                other: "",
                street: "",
                city: "",
            },
            birthDate: new Date(),
            birthPlace: "",
            phoneNumber: "",
            gender: "M.",

        };
    };

    componentWillMount() {
        this.checkInfo();
    };

    checkInfo = async () => {
        try {
            const {status} = await API.checkInfo(localStorage.getItem("token"));
            if (status === 402){
                this.setState({form: true});
            }
            else if (status === 400 || status === 401){
                console.log("error");
            }
        } catch (error) {
            console.error(error);
        }
    };

    updateInfo = async () => {
        if (this.state.form) {
            const {address, birthDate, birthPlace, gender} = this.state;
            try {
                const {status} = await API.addInfo(localStorage.getItem("token"), address, gender, birthDate, birthPlace);
                if (status === 200){
                    this.send();
                    this.props.onClose();
                }
                else {
                    console.log("error");
                }
            } catch (error) {
                console.error(error);
            }
        }
        else {
            this.send();
            this.props.onClose();
        }
    }
    ;

    send = async () => {
        const {amount, nbMonths, rate, expirationDate, reimbursementAuto} = this.props.data;
        try {
            await API.add_loan(localStorage.getItem("token"), amount, nbMonths, rate, expirationDate, reimbursementAuto);
        } catch (error) {
            console.error(error);
        }
    };

    handleVerif = () => {
        if(!this.state.checked)
            this.setState({checked: true});
        else
            this.setState({checked: false});
    };

    handleDateChange = (date) => {
        this.setState({
            birthDate: date
        });
    };

    handleGenreChange = (event) => {
        this.setState({
            gender: event.target.value
        });
    };

    handleFormChange = (event) => {
        this.setState({
            [event.target.id] : event.target.value
        });
    };

    render() {

        let form;

        if (this.state.form) {
            form =
                <div>
                    <DialogContentText>
                        Il semblerait que ce soit votre première participation.
                        Avant de poursuivre, nous avons besoin de quelques informations supplémentaires.
                    </DialogContentText>
                    <Select
                        value={this.state.gender}
                        onChange={this.handleGenreChange}
                    >
                        <MenuItem value={"M."}>M.</MenuItem>
                        <MenuItem value={"Mme"}>Mme</MenuItem>
                    </Select>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="phoneNumber"
                        value={this.state.phoneNumber}
                        onChange={this.handleFormChange}
                        label="Numéro de téléphone"
                        type="number"
                        fullWidth
                        required
                        className={"pb-3"}
                    />
                    <div className={"row"}>
                        <div className={"col pt-1"}>
                            <FormLabel>Date de Naissance *</FormLabel>
                        </div>
                        <div className={"col"}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={frLocale}>
                            <DatePicker
                                value={this.state.birthDate}
                                onChange={this.handleDateChange}
                                maxDate={new Date("2021-01-01")}
                                color={"secondary"}
                                format="dd MMMM yyyy"
                            />
                        </MuiPickersUtilsProvider>
                        </div>
                    </div>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="birthPlace"
                        label="Ville de Naissance"
                        value={this.state.birthPlace}
                        onChange={this.handleFormChange}
                        type="text"
                        fullWidth
                        required
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="street"
                        value={this.state.street}
                        onChange={this.handleFormChange}
                        label="Adresse"
                        type="text"
                        fullWidth
                        required
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="other"
                        value={this.state.other}
                        onChange={this.handleFormChange}
                        label="Adresse (ligne 2)"
                        type="text"
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="postcode"
                        value={this.state.postcode}
                        onChange={this.handleFormChange}
                        label="Code Postal"
                        type="number"
                        fullWidth
                        required
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="city"
                        value={this.state.city}
                        onChange={this.handleFormChange}
                        label="Ville"
                        type="text"
                        fullWidth
                        required
                    />
                </div>;
        }
        else {
            form = <div></div>;
        }

        return (
            <div>
                <Dialog open={this.props.open} onClose={this.props.onClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Attention !</DialogTitle>
                    <DialogContent>
                        {form}
                        <div className={"row py-4"}>
                            <div className={"col pt-1"}>
                                <DialogContentText>En cochant, vous vous engagez à donner ou devoir la somme d'argent
                                    annoncée</DialogContentText>
                            </div>
                            <div className={"col mx-auto"}>
                                <Switch className={"mx-auto"}
                                        onChange={this.handleVerif}
                                        id="checked"
                                        inputProps={{'aria-label': 'secondary checkbox'}}
                                        color="primary"
                                        checked={this.state.checked}
                                        required
                                />
                            </div>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.onClose} color="primary">
                            Annuler
                        </Button>
                        <Button onClick={this.updateInfo} color="primary">
                            Envoyer
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
};