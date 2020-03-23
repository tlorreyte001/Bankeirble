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
            <header>
                <div className="logo-container">
                    <a href={"/acceuil"}><img className="imglogo" src="./img/logo.png" alt="logo" />
                    <h4 className="logo">Bankeirble</h4></a>
                </div>
                    <div className={"col mr-4 text-right"}>
                        <div className={"btn dropdown-toggle text-right"} id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <img className={"text-right imgaccount"} alt="" src={"/img/user-1.png"}/> {this.state.prenom} {this.state.nom}
                    </div>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <a className="dropdown-item" href={"/"}>Tableau de Bord</a>
                        <a className="dropdown-item" href={"/"} onClick={this.logout}>Déconnexion</a>
                    </div>
                </div>
            </header>
        );
    }
}