import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import APIBC from '../../utils/APIBlockchain';

export class ProchainRemboursement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time: 0,
        };
    };

    componentDidMount() {
        // this.blockchainCall();
    };

    blockchainCall = async () => {
        const {Time} = await APIBC.loan(JSON.parse(localStorage.getItem("user")).pseudo);
        this.setState({time: Time});
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
                            <img style={image} src="img/clock.png" alt={"clock"}/>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography variant="h5" gutterBottom style={gradient}>
                                {this.state.time}
                            </Typography>
                            <Typography color="textSecondary" gutterBottom>
                            Prochain remboursement
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        );
    }
}