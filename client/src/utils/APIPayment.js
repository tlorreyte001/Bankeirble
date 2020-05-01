import axios from "axios";
const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
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
        return axios.post(
            url,
            {
                accessKeyRef: data.AccessKey,
                data: data.PreregistrationData,
                cardNumber: data.number,
                cardExpirationDate: data.expiration,
                cardCvx: data.cvv
            },
            {
                headers: headers
            }
        );
    }
}