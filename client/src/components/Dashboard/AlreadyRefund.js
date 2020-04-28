import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import APIBC from "../../utils/APIBlockchain";

export class AlreadyRefund extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nb: 0,
        };
    };

    componentDidMount() {
        this.blockchainCall();
    };

    blockchainCall = async () => {
        const {contracts} = await APIBC.loan(JSON.parse(localStorage.getItem("user")).pseudo);
        let refund = 0;
        let sum = 0;
        if (contracts){
            for(let i = 0; i < contracts.length(); i++){
                refund = refund + parseInt(contracts[i].transactions[contracts[i].transactions.length() - 1].remainingAmount)/100;
                sum = sum + parseInt(contracts[i].totalAmount)/100;
            }
            this.setState({nb: (1-(Math.round(refund/sum*100)/100))*100});
        }
        else {
            this.setState({nb: "-"});
        }
    }

    render() {
        const card = {
            margin: 'auto',
            root: {
                flexGrow: 1,
                }
        };

        const img = {
            margin: 'auto',
            display: 'block',
            maxWidth: '100%',
            maxHeight: '100%',
        };

        const image = {
            width: 32,
            height: 32,
        };

        const gradient = {
            background: "linear-gradient(to right,#e0881d,#d36362)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",};

        return (
            <Card style={{backgroundColor: "#f3f4f5",}}>
                <CardContent>
                    <Grid container spacing={3} style={card}>
                        <Grid item xs={4}>
                            <img style={image} src="img/check.png" alt={"user"}/>
                        </Grid>
                        <Grid item xs={8} sm={4}>
                            <Typography variant="h5" gutterBottom style={gradient}>
                                {this.state.nb} %
                            </Typography>
                            <Typography color="textSecondary" gutterBottom>
                                Déjà remboursé
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        );
    }
}