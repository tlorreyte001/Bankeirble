import React from "react";
import API from "../utils/API";
import {Link} from "react-router-dom";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import {Visibility, VisibilityOff} from "@material-ui/icons";
import Alert from "@material-ui/lab/Alert";
import {NavbarBankeirble} from "../components/NavbarBankeirble";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import {FooterB} from "../components/FooterB";

export class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "", //Email typed
            password: "", //Password typed
            status: "", //Status code of the server response
            showPassword: false //Boolean to show or not the password
        };
    };

    //Send the POST request to the server and wait the response.
    send = async () => {
        const { email, password } = this.state;
        try {
            const { status, data } = await API.login(email, password);
            if (status === 200) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));
                window.location = "/home";
            }
        } catch (error) {
            if (error.response.status !== 200){
                this.setState({status: error.response.status})
            }
        }
    };

    //Taking note of what is typed
    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    //Taking note of the password visibility
    handleClickShowPassword = () => {
        this.setState({showPassword: !this.state.showPassword});
    };

    render() {

        let input1, input2;

        let alertPopUp = null;

        let Adornment =
            <InputAdornment position="end">
                <IconButton
                    aria-label="toggle password visibility"
                    onClick={this.handleClickShowPassword}
                >
                    {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
            </InputAdornment>;

        if (this.state.status === 403 || this.state.status === 407){
            alertPopUp = <Alert className={"mb-3"} severity="error">Email ou mot de passe incorrect !</Alert>;
            input1 = <Input error type="email" id="email" className="FormField__Input" value={this.state.email} onChange={this.handleChange} required/>;
            input2 = <Input error type={this.state.showPassword ? 'text' : 'password'} id="password" className="FormField__Input" value={this.state.password} onChange={this.handleChange} required endAdornment={Adornment}/>;
        }
        else {
            input1 = <Input type="email" id="email" className="FormField__Input" value={this.state.email} onChange={this.handleChange} required/>;
            input2 = <Input type={this.state.showPassword ? 'text' : 'password'} id="password" className="FormField__Input" value={this.state.password} onChange={this.handleChange} required endAdornment={Adornment}/>;
        }

        return (
            <div>
                <NavbarBankeirble welcome={true}/>
                <Container className={"py-5"}>
                    <Paper className="text-center mx-auto pt-3" style={{maxWidth: "35em",}}>
                        {alertPopUp}
                        <div className="FormField">
                            <label className="FormField__Label" htmlFor="email">E-Mail</label>
                            {input1}
                        </div>
                        <div className="FormField">
                            <label className="FormField__Label" htmlFor="password">Mot de passe</label>
                            {input2}
                        </div>
                        <div className="FormField pb-5">
                            <button onClick={this.send} className="FormField__Button mr-20">Se connecter</button> <Link to="/signup" className="FormField__Link">Je n'ai pas de compte</Link>
                        </div>
                    </Paper>
                </Container>
            </div>
        );
    }
}
