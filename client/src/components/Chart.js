// import React from 'react';
// import {Line, Doughnut} from 'react-chartjs-2';
// export class Chart extends React.Component{
//     constructor(props){
//         super(props);
//         this.state={
//             chartData:{ 
//                 labels:[
//                     'Pour X                   32€',
//                     'Pour Y                   32€',
//                     'Pour Z                   24€',
//                     'Pour T                   12€'
//                 ],
//                 datasets: [{
//                     data: [32, 32, 24,12],
//                     backgroundColor: [
//                     '#33D69F',
//                     '#FF4C61',
//                     '#FFB800',
//                     '#6F52ED'
//                     ],
//                     hoverBackgroundColor: [
//                     '#33D69F',
//                     '#FF4C61',
//                     '#FFB800',
//                     '#6F52ED'
//                     ]
//                 }]
            
//             }
//         }

//     }
//     render(){
//         return(
//             <div className={"chartDoughnutCourbe"}>
//             <Doughnut          
//                 data={this.state.chartData}
//                 height={'300px'}
//                 width={'300px'}
//                 options={{maintainAspectRatio:false}}
//                 >
//             </Doughnut>
//             </div>
//         );
//     }
// }

import React from 'react';
import {Line, Doughnut} from 'react-chartjs-2';
import APIBC from '../utils/APIBlockchain';
export class Chart extends React.Component{
    state={
        chartData:{ 
            labels:[
                // 'Pour X                   32€',
                // 'Pour Y                   32€',
                // 'Pour Z                   24€',
                // 'Pour T                   12€'
            ],
            datasets: [{
                // data: [32, 32, 24,12],
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

    componentDidMount = async() => {
        try{
            // let {response} = await APIBC.history(JSON.parse(localStorage.getItem("user")).pseudo);
            const {nbLoans, reputation} = await APIBC.loan(JSON.parse(localStorage.getItem("user")).pseudo);
            console.log(nbLoans, reputation);

            // const {response} = await APIBC.history(JSON.parse(localStorage.getItem("user")).pseudo);
            // console.log(response);


            // let fakeRates = {rate: [65, 59, 80, 81, 56],
            //      date:['Janvier', 'Février', 'Mars', 'Avril', 'Mai']
            //     };

            // // let data = await response.json();
            // this.setState(state => (state.chartData.datasets[0].data = fakeRates.rate, state));
            // this.setState(state => (state.chartData.labels = fakeRates.date, state));
            // console.log(this.state);
        } catch(e){
            console.log(e)
        }
    }
    render(){
        return(
            <div className={"chartDoughnutCourbe"}>
            <Doughnut          
                data={this.state.chartData}
                height={'300px'}
                width={'300px'}
                options={{maintainAspectRatio:false}}
                >
            </Doughnut>
            </div>
        );
    }
}
