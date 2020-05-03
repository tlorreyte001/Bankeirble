import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import APIP from "../../utils/APIPayment";

export class Balance extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            balance: '-',
        };
    };

    componentDidMount() {
        this.get();
    };

    get = async () => {
        APIP.get_wallet(
            localStorage.getItem("token")
        )
            .then((data) => {
                if (data.data.text === "Succès"){
                    console.log(data.data);
                    this.setState({balance: data.data.Balance.Balance.Amount});
                }
            })
            .catch((reason) => {
                console.log(reason);
            })
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
            <Card style={{backgroundColor: "#f3f4f5",}}>
                <CardContent>
                    <Grid container spacing={3} style={card}>
                        <Grid item xs={4}>
                            <img style={image} src="img/coins.png" alt={"user"}/>
                        </Grid>
                        <Grid item xs={8} sm={4}>
                            <Typography variant="h5" gutterBottom style={gradient}>
                                {this.state.balance} €
                            </Typography>
                            <Typography color="textSecondary" gutterBottom>
                                Portefeuille Bankeirble
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        );
    }
}