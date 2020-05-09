import React from "react";
import APIBC from "../../utils/APIBlockchain";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';
import Button from "@material-ui/core/Button";

export class Litige extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            open: true
        };
    };

    componentDidMount() {
        this.blockchainCall();
    };

    blockchainCall = async () => {
        const {contracts} = await APIBC.litigation(JSON.parse(localStorage.getItem("user")).pseudo);
        if (contracts && contracts.length !== 0){
            for (let i = 0; i < contracts.length; i++){
                if (contracts[i].litigation){
                    this.setState({id: contracts[i].contractId});
                    this.setState({open: true});
                }
            }
        }
    }

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({open: false});
    };

    button = () => {
        let user = JSON.parse(localStorage.getItem("user")).pseudo;
        let loanId = this.state.id;
        let url = "http://localhost:8800/loan/contract?user=" + user + "&loanId=" + loanId;
        console.log(url);
        window.open(url);
    }

    render() {

        let style = {
            fontWeight: "800",
            textTransform: "none",
            fontSize: "1rem"
        };

        return (
            <div style={{width: '100%'}}>
                <Snackbar open={this.state.open} onClose={this.handleClose}
                          anchorOrigin={{ vertical: "top", horizontal: "center" }}
                          key={`${"top"},${"center"}`}>
                    <Alert
                        severity="error"
                        elevation={6}
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={this.handleClose}
                            >
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                    >
                        <AlertTitle>Un de vos prêts présente un litige de remboursement !</AlertTitle>
                        Veuillez trouver votre contrat vous liant avec les différents partis
                        <Button onClick={this.button} style={style} color={"primary"}>Télécharger</Button>
                    </Alert>
                </Snackbar>
            </div>
        );
    }
}