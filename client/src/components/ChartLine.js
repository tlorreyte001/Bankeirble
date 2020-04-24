import React from 'react';
import {Line} from 'react-chartjs-2';

export class ChartLine extends React.Component{
    constructor(props){
        super(props);
        this.state={
            chartData:{ 
                labels: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet','Août', 'Septembre', 'Octobre', 'Novembre','Decembre'],
                datasets: [
                    {
                    label: 'Courbe de taux',
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: 'rgb(211,99,98)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: '#e0881d',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: '#d36362',
                    pointHoverBorderColor: '#e0881d',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: [65, 59, 80, 81, 56, 55, 40, 30, 50, 60, 70, 40]
                }]
                            
            }
        }

    }
    render(){
        return(
            <div className={"chart"}>
            <Line         
                data={this.state.chartData}
                options={{maintainAspectRatio:false}}
                >
            </Line>
            </div>
        );
}
}