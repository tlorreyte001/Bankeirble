import React from "react";
import API from "../utils/API";
import {Link} from "react-router-dom";

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
            window.location = "/accueil";
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
        return (
            <div className="text-center mx-auto pt-5" style={{maxWidth: "35em",}}>
                <div className="FormField">
                    <label className="FormField__Label" htmlFor="email">E-Mail</label>
                    <input type="email" id="mail_perso" className="FormField__Input" name="email" value={this.state.mail_perso} onChange={this.handleChange} />
                </div>
                <div className="FormField">
                    <label className="FormField__Label" htmlFor="password">Mot de passe</label>
                    <input type="password" id="password" className="FormField__Input" name="password" value={this.state.password} onChange={this.handleChange} />
                </div>
                <div className="FormField">
                    <button onClick={this.send} className="FormField__Button mr-20">Se connecter</button> <Link to="/signup" className="FormField__Link">Je n'ai pas de compte</Link>
                </div>

                <img className="big-circle" src="./img/big-eclipse.svg" alt=""/>
                <img className="med-circle" src="./img/mid-eclipse.svg" alt=""/>
                <img className="sm-circle" src="./img/small-eclipse.svg" alt=""/>
            </div>
        );
    }
}
