import React from 'react';
import {ChartBar} from './ChartBar';
import {Chart} from "./Chart";
import {NbActiveLoans} from "./Dashboard/NbActiveLoans";
import {LoanAmount} from "./Dashboard/LoanAmount";
import {Refund} from "./Dashboard/Refund";
import {AlreadyRefund} from "./Dashboard/AlreadyRefund";
import {Reputation} from "./Dashboard/Reputation";
import {ProchainRemboursement} from "./Dashboard/ProchainRemboursement";


import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
// import {StickyHeadTable} from "./Historytable";


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));

class ContentArea extends React.Component {

    render(){
        return(
            <section class={"content-area"}>
            <div class={"heading"}>
                <h1>Dashboard</h1>
            </div>

            <div className={useStyles.root}>
            <Grid container spacing={3}>

                
                 <Grid container item xs={12} spacing={3}>           

                    <Grid item xs={6} sm={3}>
                    <Paper className={useStyles.paper}> <NbActiveLoans/></Paper>
                    </Grid>

                    <Grid item xs={6} sm={3}>
                    <Paper className={useStyles.paper}><LoanAmount/></Paper>
                    </Grid>

                    <Grid item xs={6} sm={3}>
                    <Paper className={useStyles.paper}> <Refund/></Paper>
                    </Grid>

                    <Grid item xs={6} sm={3}>
                    <Paper className={useStyles.paper}><AlreadyRefund/></Paper>
                    </Grid>

                </Grid>

                
                 
                <Grid container item xs={12} spacing={3}>           
                    <Grid item xs={12} sm={9}>
                    <Paper className={useStyles.paper}> <ChartBar /></Paper>
                    </Grid>

                    <Grid item xs={3} sm={3}>
                    <Paper className={useStyles.paper}>  <p> Mes prêts en cours</p>
                    <div className={"diver"} />
                    <div>
                     <Chart />
                     </div>
                    
                    </Paper>
                    </Grid>

                    {/* <Grid direction="column" container spacing={3} item xs={6} sm={3} justify="flex-start">

                        <Grid item>
                        <Paper className={useStyles.paper}><ProchainRemboursement /></Paper>
                        </Grid>

                        <Grid item>
                        <Paper className={useStyles.paper}>  <Reputation /></Paper>
                        </Grid>


                    </Grid>  */}
                </Grid>
                <Grid direction="column" container spacing={3} item xs={6} sm={3} justify="flex-start">

                    <Grid item>
                    <Paper className={useStyles.paper}><ProchainRemboursement /></Paper>
                    </Grid>

                    <Grid item>
                    <Paper className={useStyles.paper}>  <Reputation /></Paper>
                    </Grid>


                </Grid> 

            </Grid>
            </div>


            <div class={"cards"}>
        
                {/* <div class={"card-1"}> */}
                 {/* <div class={"Base-1"}>*/}
                {/*  <img class="imgcard-1" src="./img/user-1.png" alt="logo" />*/}
                {/*  <p>Mes prêts en cours</p>*/}
                {/*</div> */}
                {/* <NbActiveLoans/> */}
                {/* </div> */}

                {/* <div class={"card-2"}> */}
                  {/*<div class={"Base-1"}>*/}
                  {/*<img class="imgcard-1" src="./img/coins.png" alt="logo" />*/}
                  {/*<p>Somme de prêts</p>*/}
                {/*</div>*/}
                    {/* <LoanAmount/> */}
                {/* </div> */}

                {/* <div class={"card-3"}> */}
                {/*  <div class={"Base-1"}>*/}
                {/*  <img class="imgcard-1" src="./img/credit-card.png" alt="logo" />*/}
                {/*  <p>Reste à rembourser</p>*/}
                {/*</div>*/}
                {/* <Refund/> */}
                {/* </div> */}

                {/* <div class={"card-4"}> */}
                {/*  <div class={"Base-1"}>*/}
                {/*  <img class="imgcard-1" src="./img/check.png" alt="logo" />*/}
                {/*  <p>Déjà remboursé</p>*/}
                {/*</div>*/}
                {/* <AlreadyRefund/> */}
                {/* </div> */}

                {/* <div class={"card-5"}> */}
                  {/* <div class={"Base-1"}>
                  <img class="imgcard-1" src="./img/clock.png" alt="logo" />
                  <p>Prochain remboursement</p>
                </div> */}
                {/* <ProchainRemboursement /> */}
                {/* </div> */}

                {/* <div class={"card-6"}> */}
                  {/* <div class={"Base-1"}>
                  <img class="imgcard-1" src="./img/star.png" alt="logo" />
                  <p>Réputation</p>
                </div> */}
                {/* <Reputation /> */}
                {/* </div> */}

            </div>


            <div className={"Charts"}>
                {/* <div className={"chart-bar"}>
                    <div className={"Base-chart-bar"}>
                     <ChartBar />
                    </div>
                </div> */}

            
                {/* <div className={"chart-doughnut"}>
                    <div className={"Base-chart-doughnut"}>
                    <p> Mes prêts en cours</p>
                    <div className={"diver"}></div>
                     <Chart />
                    </div>
                </div> */}

                {/* <div className={"history-table"}>
                    <div className={"Base-histrory-table"}>
                     <StickyHeadTable />
                    </div>
                </div> */}

            </div>

            
            </section>
        )
    }
}

export default ContentArea;