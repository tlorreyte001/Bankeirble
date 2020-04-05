//All functions to request the server

import axios from "axios";
const headers = {
  "Content-Type": "application/json",
};
const requestOptions = {
    responseType: 'blob'
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
        return axios.get(
            burl + "/user/checkInfo",
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

    addInfo: function(user, address, gender, birthDate, birthPlace){
        return axios.put(
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
        return axios.get(
            burl + "/user/nbRequest",
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
        return axios.get(
            burl + "/loan/rate",
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

    table: function(user){
        return axios.get(
            burl + "/loan/table",
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

    accept: function(user, loanId){
        return axios.put(
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
        return axios.delete(
            burl + "/loan/delete",
            {
                params: {
                    user: user,
                    loanId: loanId
                },
                headers: {
                    headers
                }
            }
        );
    },

    contract: function(user, loanId){
        return axios.post(
            burl + "/loan/contract",
            {
                    user: user,
                    loanId: loanId
                
            },
            requestOptions
        );
    },

    isAuth: function() {
        return localStorage.getItem("token") !== null;
    }

};
