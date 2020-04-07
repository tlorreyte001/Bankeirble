import React from "react";

import { GlobalTable } from "../components/GlobalTable.js";
import { NavbarBankeirble } from "../components/NavbarBankeirble";
import Container from "@material-ui/core/Container";
import {FooterB} from "../components/FooterB";


export class Loans extends React.Component {

    render() {

        let gradient = {
            background: "linear-gradient(to right,#e0881d,#d36362)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",};

        return (
            <div>
                <NavbarBankeirble/>
                <Container className={"pt-5"}>
                    <GlobalTable />
                </Container>
                <div className={"container-max pt-3 pb-5"}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#f3f4f5" fillOpacity="1" d="M0,96L60,122.7C120,149,240,203,360,208C480,213,600,171,720,144C840,117,960,107,1080,117.3C1200,128,1320,160,1380,176L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path></svg>
                    <div className={"pb-5"} style={{backgroundColor: "#f3f4f5",}}>
                        <Container className={"pb-5"}>
                            <div className={"row"}>
                                <div className={"mx-auto pt-5"} style={{maxWidth: "40em",}}>
                                    <h2 style={{fontWeight: "bold",}} className={"px-2"}>Le marché des prêts
                                        <span style={gradient}> Bankeirble</span>
                                    </h2>
                                </div>
                            </div>
                            <div className={"row"}>
                                <div className={"mx-auto pt-5"} style={{maxWidth: "70em",}}>
                                    <p>Prêter de l'argent n'a jamais été aussi facile. Le marché permet de choisir un prêt qui vous correspond selon vos critères.</p>
                                    <p>Vous pouvez simplement consulter la blockchain pour vous assurer que l'utilisateur est de confiance. Recevez un remboursement avec une partie de l'interet chaque mois.</p>
                                </div>
                            </div>
                        </Container>
                    </div>
                </div>
                <FooterB/>
            </div>
        );
    }
}