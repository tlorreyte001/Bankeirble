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
            
            prochainRemboursement: '',
            
        };
    };

    componentDidMount() {
        this.previsionCall();
    };
    previsionCall = async () => {
        let tempData = '';

        var todayDate = new Date();
        var dd = Number(todayDate.getDate());
        var mm = Number(todayDate.getMonth()+1); 
        var yyyy = Number(todayDate.getFullYear());

        console.log('Today Date' + dd);
  
        try{
            const {contracts} = await APIBC.prevision(JSON.parse(localStorage.getItem("user")).pseudo);
            console.log('Prevision', contracts);


            var nextContract = {};

            for (let contract of contracts) {          
            
                var tempDate = contract.startingDate .toString();
                var month = Number(tempDate.substring(4, 6));
                var day = Number(tempDate.substring(6, 8));
                console.log('Contract Date' + day);


                if (day > dd || (day == dd && month != mm)){
                    nextContract = contract;
                    console.log('day > dd', nextContract);
                    break;
                }
            }
            console.log('Next contract', nextContract);

            if (Object.keys(nextContract).length === 0 && nextContract.constructor === Object){

                nextContract = contracts[0];
                console.log('day < dd', nextContract);
            }
            
            var tempNextDate = nextContract.startingDate .toString();
            var day = Number(tempNextDate.substring(6, 8));



            if (day < 10){
                day = '0' + day.toString();
            }

            if (month < 9){
                month = month + 1;
                month = '0' + month.toString();
            }else if (month = 12){
                month = 1;
                month = '0' + month.toString();
                yyyy = yyyy + 1;
            } else{
                month = month + 1 .toString();

            }

            tempData = day .toString() + '/' + month.toString() + '/' + yyyy.toString();
            

        this.setState(state => (state.prochainRemboursement = tempData, state));
  
        } catch(e) {
            console.log(e);
        }
  
    }

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
            <Card style={{backgroundColor: "#ffffff",}}>
                <CardContent>
                    <Grid container spacing={3} style={card}>
                        <Grid item xs={4}>
                            <img style={image} src="img/clock.png" alt={"clock"}/>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography variant="h5" gutterBottom style={gradient}>
                                {this.state.prochainRemboursement}
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