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
            contracts: [],
            toPay: [],
            openPopUp: false,
            firstInfo: '',
            number: '',
            expiration : '',
            cvv: ''
        };
    };

    componentDidMount() {
        this.blockchainCall();
    };

    blockchainCall = async () => {
        const {contracts} = await APIBC.history(JSON.parse(localStorage.getItem("user")).pseudo);
        if (contracts){
            console.log(contracts);
            this.setState({contracts: contracts});
        }
        this.toRefund();
    }

    toRefund = () => {
        let toPay = [];
        let contracts = this.state.contracts;
        for (let i = 0; i < contracts.length; i++){
            if (contracts[i].transactions.length === 0){
                toPay.push({
                        contractId : contracts[i].contractId,
                        amount : Math.round(((parseInt(contracts[i].totalAmount)/100 * (1 + parseInt(contracts[i].rate) / 10000)) / parseInt(contracts[i].duration))*100)/100
                    });
            }
        }
        console.log(toPay);
        this.setState({toPay : toPay});
    }

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
            .then((data) => {
                //Preregistration Data Access Key
                console.log(data);
            })
            .catch((reason) => {
                console.log(reason);
            })
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
        return(
            <div>
                <Button disabled={this.state.disabled} variant="contained" color="primary" className={"m-3"} onClick={this.pay}>Payer</Button>
                <Dialog open={this.state.openPopUp} onClose={this.state.openPopUp} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Informations de Paiement</DialogTitle>
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
                                label="MM/AA"
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
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Annuler
                        </Button>
                        <Button onClick={this.second} color="primary">
                            Envoyer
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}