import React from "react";

import Footer from 'rc-footer';
import 'rc-footer/assets/index.css';

export class FooterB extends React.Component {
    render(){
        let style = {
            hover: {
                color: "#e0881d"
            },
        };
        return(
            <div>
                <Footer
                    style={style}
                    theme={"light"}
                    columns={[
                        {
                            title: 'Guide du crédit',
                            items: [
                                {
                                    title: 'Microcrédit',
                                    url:"https://google.com"
                                },
                                {
                                    title: 'Paiement en plusieurs fois via Paypal',
                                },
                                {
                                    title: 'Apport de la blockchain',
                                },
                            ],
                        },
                        {
                            title: 'Support',
                            items: [
                                {
                                    title: 'Nous contacter',
                                },
                                {
                                    title: 'Nous rejoindre',
                                },
                                {
                                    title: 'FAQ',
                                },
                            ],
                        },
                        {
                            title: 'Infos légales',
                            items: [
                                {
                                    title: 'CGU Bankeirble',
                                },
                                {
                                    title: 'Données personnelles',
                                },
                                {
                                    title: 'Mentions légales',
                                },
                            ],
                        }
                    ]}
                    bottom="Made with ❤️ and gluten free    "
                />
            </div>
        );
    }
}