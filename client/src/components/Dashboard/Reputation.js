import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import APIBC from '../../utils/APIBlockchain';

export class Reputation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rep: 0,
        };
    };

    componentDidMount() {
        this.blockchainCall();
    };

    blockchainCall = async () => {
        const {reputation} = await APIBC.loan(JSON.parse(localStorage.getItem("user")).pseudo);
        this.setState({rep: reputation});
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
                            <img style={image} src="img/star.png" alt={"star"}/>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography variant="h5" gutterBottom style={gradient}>
                                {this.state.rep}
                            </Typography>
                            <Typography color="textSecondary" gutterBottom>
                            Réputation 
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        );
    }
}