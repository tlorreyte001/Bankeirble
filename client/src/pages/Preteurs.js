import React from "react";

import { GlobalTable } from "../components/GlobalTable.js";
import { NavbarBankeirble } from "../components/NavbarBankeirble";

import Web3 from 'web3';

export class Preteurs extends React.Component {

    render() {
        const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');
        console.log(web3.eth);

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