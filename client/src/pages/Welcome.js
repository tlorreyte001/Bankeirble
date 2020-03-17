import React from 'react';
import {NavLink} from 'react-router-dom';

import './styleAcceuil.css';
export class Welcome extends React.Component {

    handleCommencer(){
        window.location = "/signup";
    };

    handleSeConnecter(){
        window.location = "/login";
    }

render(){
  return (

  
<div>
    <header>
        <div className="logo-container">
            <img className="imglogo" src="./img/logo.png" alt="logo" />
            <h4 className="logo">Bankeirble</h4>
            
        </div>
        <nav>
            <ul className="nav-links">
                <li ><a className="nav-link" href="/">Transacions</a></li>
                <li ><a className="nav-link" href="/">Liste des prêts</a></li>
                <li ><NavLink to={"/formulaire"} className="nav-link" activeStyle={{color: "red"}}>Formulaire</NavLink></li>
            
            </ul>
        </nav>
        <div className="account-icon">
            <img className="imgaccount" src="./img/user-1.png" alt="account-icon" />
        </div>
    </header>

    <main>
        <section className="presentation">
            <div className="introduction">
                <div className="intro-text">
                    <h1>Prenez le contrôle</h1>
                    <p>Recevez ou prêtez de l'argent facilement et rapidement. 
                        Avec la confiance de la BlockChain </p>
                </div>
                <div className="cta">
                    <button className="cta-select" onClick={this.handleCommencer}>Commencer</button>
                    <button className="cta-add" onClick={this.handleSeConnecter}>Connection</button>

                </div>
            </div>
          
            <div className="cover">
                <img src="./img/logo-2.png" alt="cover" />  
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
