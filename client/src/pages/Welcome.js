import React,{Component} from 'react';
import { NavLink} from 'react-router-dom';
import {Link} from 'react-scroll';


import './styleAcceuil.css';


export class Welcome extends Component {

    handleCommencer = ()=>{
        window.location = "/signup";
    };
    handleConnect = ()=>{
        window.location ="/login"
    };
render(){
  return (

  
<div>
    <header>
        <div className="logo-container">
        <NavLink to={"/acceuil"}>
            <img className="imglogo" src="./img/logo.png" alt="logo" />
            <h4 className="logo">Bankeirble</h4>
        </NavLink>   
        </div>
        <nav>
            <div className="sectionsBar">
            <Link
                    className="nav-link"
                    activeClass="active"
                    to="presentation-1"
                    spy={true}
                    smooth={true}
                    offset={-70}
                    duration= {500}
                >
                    Presentation-1
                </Link>

                <Link
                    className="nav-link"
                    activeClass="active"
                    to="presentation-2"
                    spy={true}
                    smooth={true}
                    offset={-70}
                    duration= {500}
                >
                    Presentation-2
                </Link>

                <Link
                    className="nav-link"
                    activeClass="active"
                    to="presentation-3"
                    spy={true}
                    smooth={true}
                    offset={-70}
                    duration= {500}
                >
                    Presentation-3
                </Link>
             </div>
        </nav>
        {/* <nav>
            <ul className="nav-links">
                <li ><a className="nav-link" href="#">Transacions</a></li>
                <li ><a className="nav-link" href="#">Liste des prêts</a></li>
                <li ><NavLink to={"/formulaire"} className="nav-link" activeStyle={{color: "red"}}>Formulaire</NavLink></li>
            
            </ul>
        </nav> */}
        <div className="account-icon">
            <NavLink to={"/login"}>
             <img className="imgaccount" src="./img/user-1.png" alt="account-icon" />
            </NavLink>
            <NavLink to={"/signup"}>
            <h4 className="signup">Sign up</h4>
            </NavLink>

        </div>
    </header>

    <main>
    <section className="presentation-1">
            <div className="introduction">
                <div className="intro-text">
                    <h1>Le prêt entre particuliers pensé pour vous </h1>
               
                </div>
                <div className="cta">
                    <button className="cta-select" onClick={this.handleCommencer}>Commencer</button>
                    <button className="cta-add"  onClick={this.handleConnect}>Connexion</button>

                </div>
            </div>
          
            <div className="cover-1">
                <img src="./img/logo-1.png" alt="cover-1" />  
            </div>
        </section>

        <section className="presentation-2">
            <div className="introduction">
                <div className="intro-text-2">
                <div className="cover-2">
                    <img src="./img/logo-2.png" alt="cover-2" />  
                     </div>
                    <h1>Prenez le contrôle</h1>
                    <p> Recevez ou prêtez de l'argent facilement et rapidement. </p>
                    <p>Avec la confiance de la BlockChain </p>
                </div>
                
            </div>
          
            {/* <div className="cover-2">
                <img src="./img/logo-2.png" alt="cover-2" />  
            </div> */}
        </section>

        <section className="presentation-3">
            <div className="introduction">
                <div className="intro-text">
                    <h1>Par les étudiants, Pour les étudiants</h1>
                    <p> N'ayez plus peur des imprévues</p> 
                    <p> et gardez votre sang froid. </p>
                </div>
            </div>
          
            <div className="cover-3">
                <img src="./img/logo-3.png" alt="cover-3" />  
            </div>
        </section>

        <img className="big-circle" src="./img/big-eclipse.svg" alt=""/>
        <img className="med-circle" src="./img/mid-eclipse.svg" alt=""/>
        <img className="sm-circle" src="./img/small-eclipse.svg" alt=""/>

    </main>
</div>
    );
}
}
