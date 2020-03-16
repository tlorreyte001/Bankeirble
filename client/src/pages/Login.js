import React from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import API from "../utils/API";

export class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            mail_perso: "",
            password: ""
        };
    };

    send = async () => {
        const { mail_perso, password } = this.state;
        if (!mail_perso || mail_perso.length === 0) {
            return;
        }
        if (!password || password.length === 0) {
            return;
        }
        try {
            const { data } = await API.login(mail_perso, password);
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            window.location = "/acceuil";
        } catch (error) {
            console.error(error);
        }
    };

    change(){
        window.location = "/sign-up";
    };

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    render() {
        const { mail_perso, password } = this.state;
        return (
            <div className={"container-fluid text-center Login"}>
                <div className={"col"}>
                    <div className={"mx-auto pt-5"} style={{maxWidth: "25%"}}>
                        <h3>Connexion</h3>
                        <FormGroup controlId="mail_perso">
                            <FormLabel>E-mail</FormLabel>
                            <FormControl
                                autoFocus
                                type="email"
                                value={mail_perso}
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                        <FormGroup controlId="password">
                            <FormLabel>Mot de passe</FormLabel>
                            <FormControl
                                value={password}
                                onChange={this.handleChange}
                                type="password"
                            />
                        </FormGroup>
                        <Button onClick={this.send} block type="submit">
                            Se connecter
                        </Button>
                        <Button onClick={this.change} block type="submit">
                            Créer un compte
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}
