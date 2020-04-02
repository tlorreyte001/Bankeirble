import React from "react";

import { NavbarBankeirble } from "../components/NavbarBankeirble.js";
import {AddLoan} from "../components/AddLoan";
// import {GlobalTable} from "../components/GlobalTable";

export class Accueil extends React.Component {
    render() {
        return (
            <div>
                <NavbarBankeirble/>
                <div className={"container-fluid mt-3"}>
                    <div className={"row"}>
                        <div className={"col mt-2"}>
                            {/*<GlobalTable/>*/}
                        </div>
                        <div className={"col mt-2"}>
                            <AddLoan/>
                        </div>
                    </div>
                </div>
                <img className="big-circle" src="./img/big-eclipse.svg" alt=""/>
                <img className="med-circle" src="./img/mid-eclipse.svg" alt=""/>
                <img className="sm-circle" src="./img/small-eclipse.svg" alt=""/>
            </div>
        );
    }
}