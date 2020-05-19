import React from "react";
import API from "../utils/API";
import {Link} from "react-router-dom";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import {Visibility, VisibilityOff} from "@material-ui/icons";
import Alert from "@material-ui/lab/Alert";
import {NavbarBankeirble} from "../components/NavbarBankeirble";
import APIBC from "../utils/APIBlockchain"

export class BlockChain extends React.Component {
    constructor(props) {
        super(props);
    };

    visualizeBC = async () =>{
        let visualizeBC = await APIBC.visualise()
        print(JSON.stringify(visualizeBC));
    }

    render() {
        return (
            <div>
                <NavbarBankeirble/>
                {this.visualizeBC()}
            </div>
        );
    }
}