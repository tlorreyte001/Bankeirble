import axios from "axios";
const qs = require('querystring');

const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
};
const cardHeader = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Access-Control-Allow-Origin': '*'
};
const burl = "http://localhost:8800";

export default {
    check: function (user) {
        return axios.get(
            `${burl}/pay/check`,
            {
                params: {
                    user: user
                },
                headers: {
                    headers
                }
            }
        );
    },

    create: function (user) {
        return axios.post(
            `${burl}/pay/create`,
            {
                user: user
            },
            {
                headers: headers
            }
        );
    },

    get_wallet: function(user) {
        return axios.get(
            `${burl}/pay/wallet`,
            {
                params: {
                    user: user
                },
                headers: {
                    headers
                }
            }
        );
    },

    create_wallet: function (user) {
        return axios.post(
            `${burl}/pay/wallet/create`,
            {
                user: user
            },
            {
                headers: headers
            }
        );
    },

    getCards: function (user) {
        return axios.post(
            `${burl}/pay/card/get`,
            {
                user: user
            },
            {
                headers: headers
            }
        );
    },

    pay: function (user) {
        return axios.post(
            `${burl}/pay/card/`,
            {
                user: user
            },
            {
                headers: headers
            }
        );
    },

    second: function (url, data) {
        let params = {
            accessKeyRef: data.AccessKey,
            data: data.PreregistrationData,
            cardNumber: data.number,
            cardExpirationDate: data.expiration,
            cardCvx: data.cvv
        };

        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: qs.stringify(params)
        });
    },

    registration: function (user, data) {
        return axios.post(
            `${burl}/pay/card/registration`,
            {
                user: user,
                data: data
            },
            {
                headers: headers
            }
        );
    },

    justPay: function (user, data) {
        return axios.post(
            `${burl}/pay/card/justPay`,
            {
                user: user,
                data: data
            },
            {
                headers: headers
            }
        );
    }
}