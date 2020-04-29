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
        //   console.log('Response',response);

          for (let res of response.data.rates) {
              dates.push(res.date);
              rates.push(res.rate);
          }         

          // let fakeRates = {rate: [65, 59, 80, 81, 56, 55, 40, 30, 50, 60, 70, 40],
          //      date:['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet','Août', 'Septembre', 'Octobre', 'Novembre','Decembre']
          //     };
          // let data = await response.json();
          // this.setState(state => (state.chartData.datasets[0].data = fakeRates.rate, state));
          // this.setState(state => (state.chartData.labels = fakeRates.date, state));

          this.setState(state => (state.chartData.datasets[0].data = rates, state));
          this.setState(state => (state.chartData.labels = dates, state));
        //   console.log(this.state);

          // , chartData.labels: fakeRates.date});
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
