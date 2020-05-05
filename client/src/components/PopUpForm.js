import React from "react";
import API from "../utils/API";
import APIBC from "../utils/APIBlockchain";

import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormLabel} from '@material-ui/core';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Switch from "@material-ui/core/Switch";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import DateFnsUtils from "@date-io/date-fns";
import frLocale from "date-fns/locale/fr";
import {DatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import Alert from "@material-ui/lab/Alert";

export class PopUpForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: false,
            error: false,
            open: false,

            addressNumber: "",
            postcode: "",
            other: "",
            street: "",
            city: "",
            birthDate: new Date(),
            birthPlace: "",
            phoneNumber: "",
            gender: "M.",

        };
    };


    updateInfo = async () => {
        if (this.props.form) {
            const {addressNumber, postcode, other, street, city, birthDate, birthPlace, gender} = this.state;
            console.log(this.state);
            const address = {
                addressNumber: addressNumber,
                postcode: postcode,
                other: other,
                street: street,
                city: city
            };
            console.log(address);
            try {
                const {status} = await API.addInfo(localStorage.getItem("token"), address, gender, birthDate, birthPlace);
                if (status === 200 && this.state.checked === true){
                    this.send();
                    this.props.onClose();
                }
                else {
                    this.setState({error: true});
                }
            } catch (error) {
                if (error.response.status !== 200){
                    this.setState({error: true});
                }
            }
        }
        else {
            if (this.state.checked === true) {
                this.send();
                this.props.onClose();
            }
            else {
                this.setState({error: true});
            }
        }
    };

    send = async () => {
        if (!this.props.data._id) {
            const {amount, nbMonths, rate, expirationDate, reimbursementAuto} = this.props.data;
            try {
                const {status} = await API.add_loan(localStorage.getItem("token"), amount, nbMonths, rate, expirationDate, reimbursementAuto);
                if (status === 200){
                    this.props.Success(true);
                }
            } catch (error) {
                if (error.response){
                    this.props.Success(false);
                }
            }
        }
        else {
            try {
                let {status, data} = await API.accept(
                    localStorage.getItem("token"),
                    this.props.data._id
                );
                if(status === 200) {
                    console.log(data.contractHash);
                    console.log(data.contractHash.toString());
                    try {
                        APIBC.addLoan(
                            JSON.parse(localStorage.getItem("user")).pseudo,
                            this.props.data.pseudo,
                            Math.round(this.props.data.rate * 100),
                            this.props.data.nbMonths,
                            this.props.data.amount * 100,
                            parseInt(this.format(new Date(this.props.data.expirationDate))),
                            this.props.data._id.toString(),
                            data.contractHash.toString()
                        ).catch((e) => {
                            console.log(e);
                        }).then((status) => {
                            console.log(status);
                            if (status) {
                                this.props.Success(false);
                            } else {
                                this.props.Success(true);
                            }
                        })
                    } catch (e) {
                        this.props.Success(false);
                        console.log(e);
                    }
                }
            } catch (error) {
                if (error.response) {
                    this.props.Success(false);
                }
            }
        }




    };

    format = (date) => {
        let mm = date.getMonth() + 1; // getMonth() is zero-based
        let dd = date.getDate();

        return [date.getFullYear(),
            (mm>9 ? '' : '0') + mm,
            (dd>9 ? '' : '0') + dd
        ].join('');
    };

    // -------------- Form Functions ---------------- //

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
        let error = null;

        if (this.state.error){
            error = <Alert className={"mb-3"} severity="error">Une information fournie est incorrecte !</Alert>;
        }

        if (this.props.form) {
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
                        {error}
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
