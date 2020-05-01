import axios from "axios";
const headers = {
    "Content-Type": "application/json",
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
}