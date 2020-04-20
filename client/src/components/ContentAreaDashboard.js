import React from 'react';
import {ChartLine} from './ChartLine';
import {Chart} from "./Chart";

class ContentArea extends React.Component {

    render(){
        return(
            <section class={"content-area"}>
            <div class={"heading"}>
                <h1>Dashboard</h1>
            </div>
            <div class={"cards"}>
                <div class={"card-1"}>
                  <div class={"Base-1"}>
                  <img class="imgcard-1" src="./img/user-1.png" alt="logo" />
                  <p>Mes prêts en cours</p>
                </div>
                </div>

                <div class={"card-2"}>
                  <div class={"Base-1"}>
                  <img class="imgcard-1" src="./img/coins.png" alt="logo" />
                  <p>Somme de prêts</p>
                </div>
                </div>

                <div class={"card-3"}>
                  <div class={"Base-1"}>
                  <img class="imgcard-1" src="./img/credit-card.png" alt="logo" />
                  <p>Reste à rembourser</p>
                </div>
                </div>

                <div class={"card-4"}>
                  <div class={"Base-1"}>
                  <img class="imgcard-1" src="./img/check.png" alt="logo" />
                  <p>Déjà remboursé</p>
                </div>
                </div>

                <div class={"card-5"}>
                  <div class={"Base-1"}>
                  <img class="imgcard-1" src="./img/clock.png" alt="logo" />
                  <p>Prochain remboursement</p>
                </div>
                </div>
            </div>


            <div className={"Charts"}>
                <div className={"chart-line"}>
                    <div className={"Base-chart-line"}>
                     <ChartLine />
                    </div>
                </div>

            
                <div className={"chart-doughnut"}>
                    <div className={"Base-chart-doughnut"}>
                    <p> Mes prêts en cours</p>
                    <div className={"diver"}></div>
                     <Chart />
                    </div>
                </div>
            </div>

            
            </section>
        )
    }
}

export default ContentArea;