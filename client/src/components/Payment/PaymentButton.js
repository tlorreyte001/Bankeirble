import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import APIP from "../../utils/APIPayment";
import APIBC from "../../utils/APIBlockchain";
import Button from "@material-ui/core/Button";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";
import Switch from "@material-ui/core/Switch";
import TextField from "@material-ui/core/TextField";

export class PaymentButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openPopUp: false,
            firstInfo: '',
            number: '',
            expiration : '',
            cvv: '',
            data: '',
            cards: [],
            name: ''
        };
    };

    componentDidMount() {
        this.getCards();
    };

    pay = () => {
        APIP.pay(
            localStorage.getItem("token")
        )
            .then((data) => {
                //Preregistration Data Access Key
                if (data.data.text === "Succès"){
                    this.setState({firstInfo: data.data})
                    this.handleClickOpen();
                }
            })
            .catch((reason) => {
                console.log(reason);
            })
    };

    second = () => {
        let data = {
            AccessKey: this.state.firstInfo.AccessKey,
            PreregistrationData: this.state.firstInfo.PreregistrationData,
            number: this.state.number.toString(),
            expiration: this.state.expiration.toString(),
            cvv: this.state.cvv.toString()
        }

        APIP.second(
            this.state.firstInfo.CardRegistrationURL,
            data
        )
            .then(function (response) {
                return response.text();
            })
            .then((data) => {
                let Id = this.state.firstInfo.CardRegistrationId;
                let req = {
                    data: data,
                    Id: Id
                };
                APIP.registration(localStorage.getItem("token"), req)
                    .then((response) => {
                        this.getCards()
                            .then(() => {
                                this.justPay();
                            })
                    })
                    .catch((reason) => {
                        console.log(reason);
                    });
            })
            .catch((reason) => {
                console.log(reason);
            });
    };

    getCards = async () => {
        APIP.getCards(
            localStorage.getItem("token")
        )
            .then((response) => {
                this.setState({cards: response.data.data});
                console.log(this.state.cards);
            })
    };

    justPay = () => {
        let data = {
            CreditedUser: this.props.user,
            Amount: this.props.amount,
            CardId: this.state.cards[0].Id
        };
        APIBC.transaction(this.props.contractId, this.props.amount, parseInt(this.format(new Date())))
                        .then((r)=>{
                            this.handleClose();
                        })
        // APIP.justPay(
        //     localStorage.getItem("token"), data
        // )
        //     .then(async (response) => {
        //         if (data.data.text === "Succès") {
        //             APIBC.transaction(this.props.contractId, this.props.amount, parseInt(this.format(new Date())))
        //                 .then((r)=>{
        //                     this.handleClose();
        //                 })
        //         }
        //     })
    }

    format = (date) => {
        let mm = date.getMonth() + 1; // getMonth() is zero-based
        let dd = date.getDate();

        return [date.getFullYear(),
            (mm>9 ? '' : '0') + mm,
            (dd>9 ? '' : '0') + dd
        ].join('');
    };

    // -------- Pop Up Functions --------- //
    handleClickOpen = () => {
        this.setState({openPopUp: true});
    };

    handleClose = () => {
        this.setState({openPopUp: false});
    };
    // ----------------------------------- //

    // -------- Form Functions ----------- //
    handleFormChange = (event) => {
        this.setState({
            [event.target.id] : event.target.value
        });
    };
    // ----------------------------------- //

    render() {
        let form;
        let action = this.justPay;
        if (this.state.cards.length === 0) {
            form =
                <div>
                <DialogTitle id="form-dialog-title">Aucune carte n'est liée à ce compte.</DialogTitle>
                <DialogContent>
                    <div>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="number"
                            value={this.state.number}
                            onChange={this.handleFormChange}
                            label="N°"
                            type="text"
                            fullWidth
                            required
                            className={"pb-3"}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="expiration"
                            value={this.state.expiration}
                            onChange={this.handleFormChange}
                            label="MMAA"
                            type="text"
                            fullWidth
                            required
                            className={"pb-3"}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            value={this.state.name}
                            onChange={this.handleFormChange}
                            label="Titulaire"
                            type="text"
                            fullWidth
                            required
                            className={"pb-3"}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="cvv"
                            value={this.state.cvv}
                            onChange={this.handleFormChange}
                            label="CVV"
                            type="text"
                            fullWidth
                            required
                            className={"pb-3"}
                        />
                    </div>
                </DialogContent>
                </div>;
            action = this.second;
        }


        return(
            <div>
                <Button disabled={this.state.disabled} variant="contained" color="primary" className={"m-3"} onClick={this.justPay}>Payer</Button>
                <Dialog open={this.state.openPopUp} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Récapitulatif de Paiement</DialogTitle>
                    <DialogContent>
                        <div>
                            <p>Envoie de {this.props.amount}€ à {this.props.user}</p>
                            <p>Ce paiement est sécurisé et sera inscrit dans la blockchain.</p>
                            <p>TOTAL : {this.props.amount}€ TTC</p>
                        </div>
                    </DialogContent>
                    {form}
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Annuler
                        </Button>
                        <Button onClick={action} color="primary">
                            Envoyer
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}