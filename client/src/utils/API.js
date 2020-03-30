//All functions to request the server

import axios from "axios";
const headers = {
  "Content-Type": "application/json",
};
const burl = "http://localhost:8800";

export default {
    login: function(email, password) {
        return axios.post(
            `${burl}/user/login`,
            {
                email: email,
                password: password
            },
            {
                headers: headers
            }
        );
    },

    signup: function(email, password, nom, prenom) {
        return axios.post(burl + "/user/signup", {
            email: email,
            password: password,
            lastName: nom,
            firstName: prenom
        });
    },

    checkInfo: function(user){
        return axios.post(
            burl + "/user/checkInfo",
            {
                user: user
            },
            {
                headers: headers
            }
        );
    },

    addInfo: function(user, address, gender, birthDate, birthPlace){
        return axios.post(
            burl + "/user/addInfo",
            {
                user: user,
                address: address,
                gender: gender,
                birthDate: birthDate,
                birthPlace: birthPlace
            },
            {
                headers: headers
            }
        );
    },

    nbRequest: function(user){
        return axios.post(
            burl + "/user/nbRequest",
            {
                user: user,
            },
            {
                headers: headers
            }
        );
    },

    add_loan: function(user, amount, nbMonths, rate, expirationDate, reimbursementAuto) {
        return axios.post(
            `${burl}/loan/add`,
            {
                user: user,
                amount: amount,
                nbMonths: nbMonths,
                rate: rate,
                expirationDate: expirationDate,
                reimbursementAuto: reimbursementAuto
            },
            {
                headers: headers
            }
        );
    },

    rate: function(user){
        return axios.post(
            `${burl}/loan/rate`,
            {
                user: user,
            },
            {
                headers: headers
            }
        );
    },

    table: function(user){
        return axios.post(
            `${burl}/loan/table`,
            {
                user: user,
            },
            {
                headers: headers
            }
        );
    },

    accept: function(user, loanId){
        return axios.post(
            `${burl}/loan/accept`,
            {
                user: user,
                loanId: loanId
            },
            {
                headers: headers
            })
    },

    delete: function(user, loanId){
        return axios.post(
            `${burl}/loan/delete`,
            {
                user: user,
                loanId: loanId
            },
            {
                headers: headers
            })
    },

    contract: function(user, loanId){
        return axios.post(
            `${burl}/loan/contract`,
            {
                user: user,
                loanId: loanId
            },
            {
                headers: headers
            })
    },

    isAuth: function() {
        return localStorage.getItem("token") !== null;
    }

};
