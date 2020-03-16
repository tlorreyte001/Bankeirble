import React from "react";

export class NavbarBankeirble extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nom: "",
            prenom: ""
        }
    }


    componentWillMount() {
        this.getUser();
    }

    getUser(){
        let temp = JSON.parse(localStorage.getItem("user"));
        this.setState({nom: temp.nom});
        this.setState({prenom: temp.prenom});
    };

    logout(){
        localStorage.clear();
        window.location = "/";
    };

    render() {
        return (
            <div className={"container-fluid m-3"}>
                <div className={"row"}>
                    <div className={"col"}>
                        <div className={"text-left h4"}><a className={"a-normal"} href={"/acceuil"}><img alt="" src={"/logo-1.png"} width="60" height="60"/> Bankeirble</a></div>
                    </div>
                    <div className={"col mr-4 text-right"}>
                        <div className={"btn dropdown-toggle text-right"} id="dropdownMenuButton"
                             data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <img className={"text-right"} alt="" src={"/user-1.png"} width="40" height="40"/> {this.state.prenom} {this.state.nom}
                        </div>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <a className="dropdown-item" href={"/"}>Tableau de Bord</a>
                            <a className="dropdown-item" href={"/"} onClick={this.logout}>Déconnection</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}