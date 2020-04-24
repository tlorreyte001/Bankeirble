import React,{Component} from 'react';


import './styleAcceuil.css';
import {NavbarBankeirble} from "../components/NavbarBankeirble";
import {Container} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {FooterB} from "../components/FooterB";


export class Welcome extends Component {

    handleCommencer = ()=>{
        window.location = "/signup";
    };
    handleConnect = ()=>{
        window.location ="/login"
    };

render(){

    let gradient = {
        background: "linear-gradient(to right,#e0881d,#d36362)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",};

    return (
        <div>
    {/*<header>*/}
    {/*    <div className="logo-container">*/}
    {/*    <NavLink to={"/acceuil"}>*/}
    {/*        <img className="imglogo" src="./img/logo.png" alt="logo" />*/}
    {/*        <h4 className="logo">Bankeirble</h4>*/}
    {/*    </NavLink>   */}
    {/*    </div>*/}
    {/*    <nav>*/}
    {/*        <div className="sectionsBar">*/}
    {/*        <Link*/}
    {/*                className="nav-link"*/}
    {/*                activeClass="active"*/}
    {/*                to="presentation-1"*/}
    {/*                spy={true}*/}
    {/*                smooth={true}*/}
    {/*                offset={-70}*/}
    {/*                duration= {500}*/}
    {/*            >*/}
    {/*                Presentation-1*/}
    {/*            </Link>*/}

    {/*            <Link*/}
    {/*                className="nav-link"*/}
    {/*                activeClass="active"*/}
    {/*                to="presentation-2"*/}
    {/*                spy={true}*/}
    {/*                smooth={true}*/}
    {/*                offset={-70}*/}
    {/*                duration= {500}*/}
    {/*            >*/}
    {/*                Presentation-2*/}
    {/*            </Link>*/}

    {/*            <Link*/}
    {/*                className="nav-link"*/}
    {/*                activeClass="active"*/}
    {/*                to="presentation-3"*/}
    {/*                spy={true}*/}
    {/*                smooth={true}*/}
    {/*                offset={-70}*/}
    {/*                duration= {500}*/}
    {/*            >*/}
    {/*                Presentation-3*/}
    {/*            </Link>*/}
    {/*         </div>*/}
    {/*    </nav>*/}
    {/*    /!* <nav>*/}
    {/*        <ul className="nav-links">*/}
    {/*            <li ><a className="nav-link" href="#">Transacions</a></li>*/}
    {/*            <li ><a className="nav-link" href="#">Liste des prêts</a></li>*/}
    {/*            <li ><NavLink to={"/formulaire"} className="nav-link" activeStyle={{color: "red"}}>Formulaire</NavLink></li>*/}
    {/*        */}
    {/*        </ul>*/}
    {/*    </nav> *!/*/}
    {/*    <div className="account-icon">*/}
    {/*        <NavLink to={"/login"}>*/}
    {/*         <img className="imgaccount" src="./img/user-1.png" alt="account-icon" />*/}
    {/*        </NavLink>*/}
    {/*        <NavLink to={"/signup"}>*/}
    {/*        <h4 className="signup">Sign up</h4>*/}
    {/*        </NavLink>*/}

    {/*    </div>*/}
    {/*</header>*/}

    {/*<div>*/}
    {/*    <section className="presentation-1">*/}
    {/*        <div className="introduction">*/}
    {/*            <div className="intro-text">*/}
    {/*                <h1>Le prêt entre particuliers pensé pour vous </h1>*/}
    {/*           */}
    {/*            </div>*/}
    {/*            <div className="cta">*/}
    {/*                <button className="cta-select" onClick={this.handleCommencer}>Commencer</button>*/}
    {/*                <button className="cta-add"  onClick={this.handleConnect}>Connexion</button>*/}

    {/*            </div>*/}
    {/*        </div>*/}
    {/*      */}
    {/*        <div className="cover-1">*/}
    {/*            <img src="./img/logo-1.png" alt="cover-1" />  */}
    {/*        </div>*/}
    {/*    </section>*/}

    {/*    <section className="presentation-2 mx-auto">*/}
    {/*        <div className="introduction">*/}
    {/*            <div className="intro-text-2">*/}
    {/*            <div className="cover-2">*/}
    {/*                <img src="./img/logo-2.png" alt="cover-2" />  */}
    {/*                 </div>*/}
    {/*                <h1>Prenez le contrôle</h1>*/}
    {/*                <p> Recevez ou prêtez de l'argent facilement et rapidement. </p>*/}
    {/*                <p>Avec la confiance de la BlockChain </p>*/}
    {/*            </div>*/}
    {/*            */}
    {/*        </div>*/}
    {/*      */}
    {/*        /!* <div className="cover-2">*/}
    {/*            <img src="./img/logo-2.png" alt="cover-2" />  */}
    {/*        </div> *!/*/}
    {/*    </section>*/}

    {/*    <section className="presentation-3">*/}
    {/*        <div className="introduction">*/}
    {/*            <div className="intro-text">*/}
    {/*                <h1>Par les étudiants, Pour les étudiants</h1>*/}
    {/*                <p> N'ayez plus peur des imprévues</p> */}
    {/*                <p> et gardez votre sang froid. </p>*/}
    {/*            </div>*/}
    {/*        </div>*/}
    {/*      */}
    {/*        <div className="cover-3">*/}
    {/*            <img src="./img/logo-3.png" alt="cover-3" />  */}
    {/*        </div>*/}
    {/*    </section>*/}

    {/*</div>*/}



        <NavbarBankeirble welcome={true}/>
        <Container fluid>
            <Grid container className={"pt-5"}>
                <Grid className={"my-auto"} item xs={6} spacing={3}>
                    <div>
                        <h1 style={gradient}>Le prêt entre particuliers pensé pour vous, les étudiants</h1>
                        <Button variant="contained" color="primary" onClick={this.handleCommencer} className={"mt-3"}>Commencer</Button>
                        <Button variant="contained" color="primary" onClick={this.handleConnect} className={"ml-3 mt-3"}>Connexion</Button>
                    </div>
                </Grid>
                <Grid item xs={6} spacing={3}>
                    <img src="./img/logo-1.png" alt="cover-1" className={"ml-5"}/>
                </Grid>
            </Grid>
        </Container>
        <div className={"container-max pt-3 pb-5"}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#f3f4f5" fillOpacity="1" d="M0,96L60,122.7C120,149,240,203,360,208C480,213,600,171,720,144C840,117,960,107,1080,117.3C1200,128,1320,160,1380,176L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path></svg>
            <div className={"pb-5"} style={{backgroundColor: "#f3f4f5",}}>
                <Container fluid className={"pb-5"}>
                    <Grid container className={"pt-5"}>
                        <Grid className={"my-auto"} item xs={6} spacing={3}>
                            <div>
                                <h1 style={gradient}>Prenez le contrôle</h1>
                                <h4 style={gradient}>Recevez ou prêtez de l'argent facilement et rapidement,</h4>
                                <h4 style={gradient}>avec la confiance de la BlockChain</h4>
                            </div>
                        </Grid>
                        <Grid item xs={6} spacing={3}>
                            <img src="./img/logo-2.png" alt="cover-2" className={"ml-5 cover-2"}/>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        </div>
        <FooterB/>
        </div>
        );
    }
}
