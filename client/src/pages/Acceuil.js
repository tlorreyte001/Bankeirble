import React from "react";

import { NavbarBankeirble } from "../components/NavbarBankeirble.js";
import {AddLoan} from "../components/AddLoan";
import {GlobalTable} from "../components/GlobalTable";

export class Acceuil extends React.Component {
    render() {
        return (
            <div>
                <NavbarBankeirble/>
                <div className={"container-fluid m-3"}>
                    <div className={"row"}>
                        <div className={"col mt-2"}>
                            <GlobalTable/>
                        </div>
                        <div className={"col mr-3"}>
                            <AddLoan/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}