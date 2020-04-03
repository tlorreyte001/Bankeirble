import React from "react";

import { GlobalTable } from "../components/GlobalTable.js";
import { NavbarBankeirble } from "../components/NavbarBankeirble";
import Container from "@material-ui/core/Container";
import {FooterB} from "../components/FooterB";


export class Loans extends React.Component {

    render() {

        return (
            <div>
                <NavbarBankeirble/>
                <Container className={"pt-5"}>
                    <GlobalTable />
                </Container>
                <div className={"container-max pt-3 pb-5"}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#f3f4f5" fillOpacity="1" d="M0,96L60,122.7C120,149,240,203,360,208C480,213,600,171,720,144C840,117,960,107,1080,117.3C1200,128,1320,160,1380,176L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path></svg>
                    <div className={"pb-5"} style={{backgroundColor: "#f3f4f5",}}>
                    </div>
                </div>
                <FooterB/>
            </div>
        );
    }
}