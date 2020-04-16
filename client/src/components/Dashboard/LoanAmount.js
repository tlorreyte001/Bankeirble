import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';

export class LoanAmount extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nb: 0,
        };
    };

    componentWillMount(): void {
        // setState nb
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
            width: 128,
            height: 128,
        };

        const gradient = {
            background: "linear-gradient(to right,#e0881d,#d36362)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",};

        return (
            <Card>
                <CardContent>
                    <Grid container spacing={3} style={card}>
                        <Grid item xs={4}>
                            <PersonOutlineOutlinedIcon style={img}/>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography variant="h5" gutterBottom style={gradient}>
                                {this.state.nb}
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