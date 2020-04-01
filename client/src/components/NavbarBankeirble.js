import React from "react";
import {AppBar, Toolbar, Typography, IconButton, Menu, MenuItem} from "@material-ui/core";
import Image from "react-bootstrap/Image";

export class NavbarBankeirble extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lastName: "",
            firstName: "",
            open: false,
            Anchor: null
        }
    }


    componentWillMount() {
        this.getUser();
    }

    getUser(){
        let temp = JSON.parse(localStorage.getItem("user"));
        this.setState({lastName: temp.lastName});
        this.setState({firstName: temp.firstName});
    };

    handleMenu = (event) => {
        this.setState({open: true});
        this.setState({Anchor: event.currentTarget});
    };

    handleClose = () => {
        this.setState({open: false});
        this.setState({Anchor: null});
    };

    router = (event) => {
        if (event.target.id === "/") {
            localStorage.clear();
        }
        window.location = event.target.id;
    };

    render() {
        return (
            <div style={{flexGrow: 1}}>
                {/*<div className="logo-container">*/}
                {/*    <a href={"/accueil"}><img className="imglogo" src="./img/logo.png" alt="logo" />*/}
                {/*    <h4 className="logo">Bankeirble</h4></a>*/}
                {/*</div>*/}
                {/*<div className={"col mr-4 text-right"}>*/}
                {/*    <div className={"btn dropdown-toggle text-right"} id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">*/}
                {/*        <img className={"text-right imgaccount"} alt="" src={"/img/user-1.png"}/> {this.state.prenom} {this.state.nom}*/}
                {/*    </div>*/}
                {/*    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">*/}
                {/*        <a className="dropdown-item" href={"/preteurs"}>Marché des prêts</a>*/}
                {/*        <a className="dropdown-item" href={"/"}>Tableau de Bord</a>*/}
                {/*        <a className="dropdown-item" href={"/"} onClick={this.logout}>Déconnexion</a>*/}
                {/*    </div>*/}
                {/*</div>*/}
                <AppBar position={"static"} color={"transparent"} style={{alignItems: "normal", height: "auto", boxShadow: "unset",}}>
                    <Toolbar>
                        <Image id="/accueil" onClick={this.router} className="imglogo" src="./img/logo.png" alt="logo" />
                        <Typography id="/accueil" onClick={this.router} variant="h6" color={"secondary"} style={{flexGrow: 1}}>
                            Bankeirble
                        </Typography>
                        <div>
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={this.handleMenu}
                                color="inherit"
                            >
                                <Image className={"text-right imgaccount"} alt="" src={"/img/user-1.png"}/>
                            </IconButton>
                            {this.state.firstName} {this.state.lastName}
                            <Menu
                                id="menu-appbar"
                                anchorEl={this.state.Anchor}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={this.state.open}
                                onClose={this.handleClose}
                            >
                                <MenuItem id={"/preteurs"} onClick={this.router}>Marché des prêts</MenuItem>
                                <MenuItem id={"/accueil"} onClick={this.router}>Tableau de Bord</MenuItem>
                                <MenuItem id={"/"} onClick={this.router}>Déconnexion</MenuItem>
                            </Menu>
                        </div>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}
