import React from 'react';
import {Line, Doughnut} from 'react-chartjs-2';
export class Chart extends React.Component{
    constructor(props){
        super(props);
        this.state={
            chartData:{ 
                labels:[
                    'Pour X                   32€',
                    'Pour Y                   32€',
                    'Pour Z                   24€',
                    'Pour T                   12€'
                ],
                datasets: [{
                    data: [32, 32, 24,12],
                    backgroundColor: [
                    '#33D69F',
                    '#FF4C61',
                    '#FFB800',
                    '#6F52ED'
                    ],
                    hoverBackgroundColor: [
                    '#33D69F',
                    '#FF4C61',
                    '#FFB800',
                    '#6F52ED'
                    ]
                }]
            
            }
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

