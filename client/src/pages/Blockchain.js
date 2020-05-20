import React from "react";
import {NavbarBankeirble} from "../components/NavbarBankeirble";
import SideBar from "../components/SideBar"
import APIBC from "../utils/APIBlockchain"

export class BlockChain extends React.Component {
    constructor(props) {
        super(props);
    };

    componentWillMount(){
        this.visualizeBC();
    }

    visualizeBC = async () =>{
        let visualizeBC = await APIBC.visualise()
        document.getElementById("json").textContent =JSON.stringify(visualizeBC);
    }

    render() {
        return (
            <div>
                <NavbarBankeirble welcome={true}/>
                
                <div > 
                    <p >Ceci est la vue de la BlockChain actuelle</p>
                    <p id="json"></p>
                </div>
            </div>
        );
    }
}