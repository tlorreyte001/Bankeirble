import React from 'react';
import {ChartBar} from './ChartBar';
import {Chart} from "./Chart";
import {NbActiveLoans} from "./Dashboard/NbActiveLoans";
import {LoanAmount} from "./Dashboard/LoanAmount";
import {Refund} from "./Dashboard/Refund";
import {AlreadyRefund} from "./Dashboard/AlreadyRefund";

class ContentArea extends React.Component {

    render(){
        return(
            <section class={"content-area"}>
            <div class={"heading"}>
                <h1>Dashboard</h1>
            </div>
            <div class={"cards"}>
                <div class={"card-1"}>
                {/*  <div class={"Base-1"}>*/}
                {/*  <img class="imgcard-1" src="./img/user-1.png" alt="logo" />*/}
                {/*  <p>Mes prêts en cours</p>*/}
                {/*</div>*/}
                <NbActiveLoans/>
                </div>

                <div class={"card-2"}>
                  {/*<div class={"Base-1"}>*/}
                  {/*<img class="imgcard-1" src="./img/coins.png" alt="logo" />*/}
                  {/*<p>Somme de prêts</p>*/}
                {/*</div>*/}
                    <LoanAmount/>
                </div>

                <div class={"card-3"}>
                {/*  <div class={"Base-1"}>*/}
                {/*  <img class="imgcard-1" src="./img/credit-card.png" alt="logo" />*/}
                {/*  <p>Reste à rembourser</p>*/}
                {/*</div>*/}
                <Refund/>
                </div>

                <div class={"card-4"}>
                {/*  <div class={"Base-1"}>*/}
                {/*  <img class="imgcard-1" src="./img/check.png" alt="logo" />*/}
                {/*  <p>Déjà remboursé</p>*/}
                {/*</div>*/}
                <AlreadyRefund/>
                </div>

                <div class={"card-5"}>
                  <div class={"Base-1"}>
                  <img class="imgcard-1" src="./img/clock.png" alt="logo" />
                  <p>Prochain remboursement</p>
                </div>
                </div>

                <div class={"card-6"}>
                  <div class={"Base-1"}>
                  <img class="imgcard-1" src="./img/star.png" alt="logo" />
                  <p>Réputation</p>
                </div>
                </div>

            </div>


            <div className={"Charts"}>
                <div className={"chart-bar"}>
                    <div className={"Base-chart-bar"}>
                     <ChartBar />
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