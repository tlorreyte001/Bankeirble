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
        };
    };

    componentDidMount() {
        // this.blockchainCall();
        this.getCards();
    };

    // blockchainCall = async () => {
    //     const {contracts} = await APIBC.history(JSON.parse(localStorage.getItem("user")).pseudo);
    //     if (contracts){
    //         console.log(contracts);
    //         this.setState({contracts: contracts});
    //     }
    //     this.toRefund();
    // }

    // toRefund = () => {
    //     let toPay = [];
    //     let contracts = this.state.contracts;
    //     for (let i = 0; i < contracts.length; i++){
    //         if (contracts[i].transactions.length === 0){
    //             toPay.push({
    //                     contractId : contracts[i].contractId,
    //                     amount : Math.round(((parseInt(contracts[i].totalAmount)/100 * (1 + parseInt(contracts[i].rate) / 10000)) / parseInt(contracts[i].duration))*100)/100
    //                 });
    //         }
    //     }
    //     console.log(toPay);
    //     this.setState({toPay : toPay});
    // }

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
        APIP.justPay(
            localStorage.getItem("token"), data
        )
            .then((response) => {
                console.log(response)
            })
    }

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
                        id="cvv"
                        value={this.state.cvv}
                        onChange={this.handleFormChange}
                        label="CVV"
                        type="text"
                        fullWidth
                        required
                        className={"pb-3"}
                    />
                </div>;
            action = this.second;
        }


        return(
            <div>
                <Button disabled={this.state.disabled} variant="contained" color="primary" className={"m-3"} onClick={this.pay}>Payer</Button>
                <Dialog open={this.state.openPopUp} onClose={this.state.openPopUp} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Informations de Paiement</DialogTitle>
                    <DialogContent>
                        {form}
                    </DialogContent>
                    <DialogTitle id="form-dialog-title">Utiliser une carte déjà existente</DialogTitle>
                    <DialogContent>
                        <div>

                        </div>
                    </DialogContent>
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