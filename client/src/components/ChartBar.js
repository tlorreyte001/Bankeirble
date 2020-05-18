import React from 'react';
import {Line} from 'react-chartjs-2';

import API from "../utils/API";


export class ChartBar extends React.Component{


   state={
        chartData:{ 
            labels: [],
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
                data: []
            }]
                        
        }
    }


    async componentDidMount() {
      let dates = [];
      let rates = [];
      try{
          let response = await API.rate(localStorage.getItem("token"));

          for (let res of response.data.rates) {
            var currentDate = new Date(res.date);
            dates.push(currentDate.toLocaleDateString('fr-FR'));
            rates.push(res.rate);
          }         

          this.setState(state => (state.chartData.datasets[0].data = rates, state));
          this.setState(state => (state.chartData.labels = dates, state));
        
      } catch(e){
          console.log(e)
      }
    }


    
  render() {
    return (
      
    <div className={"chartBar"}>
 <Line         
                data={this.state.chartData}
                width={800}
                height={400}
                options={{maintainAspectRatio:false}}
                >
            </Line>
            </div>
        );
}
}
