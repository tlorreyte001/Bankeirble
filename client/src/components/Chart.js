import React from 'react';
import {Line, Doughnut} from 'react-chartjs-2';
import APIBC from '../utils/APIBlockchain';
export class Chart extends React.Component{
    state={
        chartData:{ 
            labels:[
                'Pour X                   32€',
                'Pour Y                   32€',
                'Pour Z                   24€',
                'Pour T                   12€'
            ],
            datasets: [{
                data: [32, 32, 24,12],
                // data: [],

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
            // let {response} = await APIBC.history(JSON.parse(localStorage.getItem("user")).pseudo);
            const {nbLoans, reputation} = await APIBC.loan(JSON.parse(localStorage.getItem("user")).pseudo);
            console.log('Response');

            // const {response} = await APIBC.history(JSON.parse(localStorage.getItem("user")).pseudo);
            // console.log(response);


            // let fakeRates = {rate: [65, 59, 80, 81, 56],
            //      date:['Janvier', 'Février', 'Mars', 'Avril', 'Mai']
            //     };

            // // let data = await response.json();
            // this.setState(state => (state.chartData.datasets[0].data = fakeRates.rate, state));
            // this.setState(state => (state.chartData.labels = fakeRates.date, state));
            // console.log(this.state);
        
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
