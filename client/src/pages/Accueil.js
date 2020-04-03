import React from "react";

import { NavbarBankeirble } from "../components/NavbarBankeirble.js";
import {AddLoan} from "../components/AddLoan";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Image from "react-bootstrap/Image";
import {FooterB} from "../components/FooterB";
// import {GlobalTable} from "../components/GlobalTable";

export class Accueil extends React.Component {
    render() {
        let gradient = {
            background: "linear-gradient(to right,#e0881d,#d36362)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",};
        let paper = {
            textAlign: "center",};
        let image = {
            width: "100px",
            height: "100px"
        };

        return (
            <div>
                <NavbarBankeirble/>
                <Container>
                    <div className={"row"}>
                        <div className={"col mt-2"}>
                            <div className={"mx-auto"} style={{maxWidth: "40em",}}>
                                <h2 style={{fontWeight: "bold",}} className={"py-4 px-2"}>Le crédit, jusqu'à <span style={gradient}>700€</span>,</h2>
                                <h2 style={{fontWeight: "bold",}} className={"px-2"}>en plus sûr.</h2>
                                <h4 className={"py-4 px-2"}>Personnalisez votre demande -></h4>
                            </div>
                        </div>
                        <div className={"col mt-2"}>
                            <AddLoan/>
                        </div>
                    </div>
                </Container>
                <div className={"container-max pt-3 pb-5"}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#f3f4f5" fill-opacity="1" d="M0,96L60,122.7C120,149,240,203,360,208C480,213,600,171,720,144C840,117,960,107,1080,117.3C1200,128,1320,160,1380,176L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path></svg>
                    <div className={"pb-5"} style={{backgroundColor: "#f3f4f5",}}>
                        <Container className={"pb-5"}>

                            <div className={"row"}>
                                <div className={"mx-auto"} style={{maxWidth: "40em",}}>
                                    <h2 style={{fontWeight: "bold",}} className={"px-2"}>Comment ça se passe chez
                                        <span style={gradient}> Bankeirble</span> ?
                                    </h2>
                                </div>
                            </div>

                            <Grid className={"py-5"} container spacing={3}>
                                <Grid item xs={4}>
                                    <Paper className={"p-3"} style={paper}>
                                        <Image style={image} src="./img/mail.png" alt="logo"/>
                                        <p className={"pt-3"}>Je fais une demande de crédit et je renseigne mes informations</p>
                                    </Paper>
                                </Grid>
                                <Grid item xs={4}>
                                    <Paper className={"p-3"} style={paper}>
                                        <Image style={image} src="./img/hourglass.png" alt="logo"/>
                                        <p className={"pt-3"}>J'attends qu'un membre de la communauté Bankeirble accepte ma demande</p>
                                    </Paper>
                                </Grid>
                                <Grid item xs={4}>
                                    <Paper className={"p-3"} style={paper}>
                                        <Image style={image} src="./img/blockchain.png" alt="logo"/>
                                        <p className={"pt-3"}>Je reçois mon crédit et les informations sont écrites dans la blockchain</p>
                                    </Paper>
                                </Grid>
                            </Grid>

                            <div className={"row"}>
                                <div className={"mx-auto pt-5"} style={{maxWidth: "40em",}}>
                                    <h2 style={{fontWeight: "bold",}} className={"px-2"}>L'univers
                                        <span style={gradient}> Bankeirble</span>
                                    </h2>
                                </div>
                            </div>

                            <Grid className={"py-5"} container spacing={3}>
                                <Grid item xs={6}>
                                    <Paper className={"p-3"} style={paper}>
                                        <p className={"pt-3"}>Graph</p>
                                    </Paper>
                                </Grid>
                                <Grid item xs={6}>
                                    <h3>Un cours du taux évolutif</h3>
                                    <p className={"pt-3"}>
                                        Sur bankeirble, le taux de votre demande de crédit peut énormement varier suivant certains critères comme le montant et la durée d'emprunt.
                                        Les données étant décentralisées sur la blockchain, l'intégrité de celles-ci vous permet d'avoir entirement confiance aux donneurs et emprunteurs.
                                    </p>
                                    <p>
                                        Personne n'échappe à la blockchain !
                                    </p>
                                </Grid>
                            </Grid>

                        </Container>
                    </div>
                </div>
                <FooterB/>
            </div>
        );
    }
}