import React from "react";
import {AppBar, Toolbar, Typography, IconButton, Menu, MenuItem} from "@material-ui/core";
import Image from "react-bootstrap/Image";
import Badge from "@material-ui/core/Badge";
import MediaQuery from "./MediaQuery"

export class NavbarBankeirble extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lastName: "",
            firstName: "",
            open: false,
            Anchor: null,
            notifications: 0
        }
    };

    componentWillMount() {
        this.getUser();
    }

    getUser(){
        //let temp = JSON.parse(localStorage.getItem("user"));
        //this.setState({lastName: temp.lastName});
        //this.setState({firstName: temp.firstName});
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

        let menuContent =
            <div>
                <MenuItem id={"/dashboard"} onClick={this.router}>Tableau de Bord</MenuItem>
                <MenuItem id={"/"} onClick={this.router}>Déconnexion</MenuItem>
            </div>;

        let buttons = <MediaQuery/>;


        if (this.props.welcome){
            menuContent =
                <div>
                    <MenuItem id={"/login"} onClick={this.router}>Connexion</MenuItem>
                    <MenuItem id={"/signup"} onClick={this.router}>Inscription</MenuItem>
                </div>;
            buttons = null;
        }

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
                        <Image id="/home" style={{cursor: "pointer"}} onClick={this.router} className="imglogo" src="./img/logo.png" alt="logo" />
                        <div className="container-fluid" style={{flexGrow: 1}}>
                            <div className={"row"}>
                                <Typography id="/home" variant="h5" color={"secondary"} >
                                    Bankeirble
                                </Typography>
                                {buttons}
                            </div>
                        </div>


                        <div>
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={this.handleMenu}
                                color="inherit"
                            >
                                <Badge badgeContent={this.state.notifications} color="secondary">
                                    <Image className={"text-right imgaccount"} alt="" src={"/img/user-1.png"}/>
                                </Badge>
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
                                {menuContent}
                            </Menu>
                        </div>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}
