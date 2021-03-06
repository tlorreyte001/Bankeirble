import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import APIBC from "../../utils/APIBlockchain";

export class LoanAmount extends React.Component {
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
        const {contracts} = await APIBC.history(JSON.parse(localStorage.getItem("user")).pseudo);
        let sum = 0;
        if (contracts){
            console.log(contracts);
            for(let i = 0; i < contracts.length; i++){
               sum = sum + parseInt(contracts[i].totalAmount)/100;
            }
            this.setState({nb: sum});
        }
    }

    render() {
        const card = {
            margin: 'auto',
        };

        const img = {
            margin: 'auto',
            display: 'block',
            maxWidth: '100%',
            maxHeight: '100%',
        };

        const image = {
            width: 64,
            height: 64,
        };

        const gradient = {
            background: "linear-gradient(to right,#e0881d,#d36362)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",};

        return (
            <Card style={{backgroundColor: "#ffffff",}}>
                <CardContent>
                    <Grid container spacing={3} style={card}>
                        <Grid item xs={4}>
                            <img style={image} src="img/coins.png" alt={"user"}/>
                        </Grid>
                        <Grid item xs={8} sm={4}>
                            <Typography variant="h5" gutterBottom style={gradient}>
                                {this.state.nb} €
                            </Typography>
                            <Typography color="textSecondary" gutterBottom>
                                Somme des prêts
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        );
    }
}