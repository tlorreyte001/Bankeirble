import React from "react";

import { GlobalTable } from "../components/GlobalTable.js";
import { NavbarBankeirble } from "../components/NavbarBankeirble";


export class Preteurs extends React.Component {

    render() {

        return (
            <div>
                <NavbarBankeirble/>
                <div className={"container-fluid m3"}>
                    <div className={"row"}>
                        <div className={"col m3 mx-auto"}>
                            <h4>Bienvenue sur la blockchain</h4>
                            <p>Votre compte : {}</p>
                        </div>
                        <div className={"col m3 mx-auto"}>
                            <GlobalTable/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}