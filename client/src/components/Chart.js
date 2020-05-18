import React from 'react';
import {Line, Doughnut} from 'react-chartjs-2';
import APIBC from '../utils/APIBlockchain';
export class Chart extends React.Component{
    state={
        chartData:{ 
            labels:[
            ],
            datasets: [{
                data: [],

                backgroundColor: [
                '#33D69F',
                '#FF4C61',
                '#FFB800',
                '#6F52ED',
                '#870a30'
                ],

                hoverBackgroundColor: [
                '#33D69F',
                '#FF4C61',
                '#FFB800',
                '#6F52ED',
                '#870a30'
                ]
            }]
        
        }
    }
    
    componentDidMount() {
        this.blockchainCall();
    };

    blockchainCall = async () => {
        let pseudo = [];
        let amount = [];

        const {contracts} = await APIBC.history(JSON.parse(localStorage.getItem("user")).pseudo);
        

        for (let contract of contracts) {

            let obj = {
            preteur:'',
            montant:'',
            };


            obj.preteur = contract.lender .toString() + " :" + contract.totalAmount/100 + "€";
            obj.montant = contract.totalAmount/100 ;


            pseudo.push(obj.preteur);
            amount.push(obj.montant);
            
        } 
        console.log(pseudo,amount);


        this.setState(state => (state.chartData.datasets[0].data = amount, state));
        this.setState(state => (state.chartData.labels = pseudo, state));
    }

    render(){
        return(
            <div>
            <Doughnut          
                data={this.state.chartData}
                height={'361px'}
                width={'300px'}
                options={{maintainAspectRatio:false}}
                >
            </Doughnut>
            </div>
        );
    }
}
