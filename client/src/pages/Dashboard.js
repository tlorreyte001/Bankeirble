import React from "react";
import SideBar from "../components/SideBar"
import {NavbarBankeirble} from "../components/NavbarBankeirble";
import ContentArea from "../components/ContentAreaDashboard"
export class Dashboard extends React.Component{
    render(){
        return(
            <div className={"Dashboard"}>
            <NavbarBankeirble welcome={true} />
            <SideBar />
            <ContentArea />
            </div>
            
        );
    }
}

