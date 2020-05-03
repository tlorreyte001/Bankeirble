const axios = require('axios');
const Users = require("../schema/schemaUsers.js");
const jwt = require("jwt-simple");
const config = require("../config/config");
const OAuth = require("./OAuth");

async function first (req, res) {
    let access_token = await OAuth.ask(config.key);
    let user = jwt.decode(req.body.user, config.secret);
    let findUser = await Users.findOne({_id: user._id});
    if (findUser) {
        axios({
            method: 'post',
            url: 'https://api.sandbox.mangopay.com/v2.01/' + config.clientID + '/cardregistrations',
            data: {
                "UserId": findUser.mangoId,
                "Currency": "EUR",
                "CardType": "CB_VISA_MASTERCARD"
            },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + access_token
            }
        })
            .then(async function (response) {
                return res.status(200).json({
                    text: "Succès",
                    "AccessKey": response.data.AccessKey,
                    "PreregistrationData": response.data.PreregistrationData,
                    "CardRegistrationURL":  response.data.CardRegistrationURL,
                    "CardRegistrationId" : response.data.Id
                });
            })
            .catch(function (error) {
                // handle error
                console.log(error);
                return res.status(400).json({ //Code à revoir
                    text: "Echec"
                });
            })
    }
}

async function registration (req, res) {
    let access_token = await OAuth.ask(config.key);
    let user = jwt.decode(req.body.user, config.secret);
    let findUser = await Users.findOne({_id: user._id});
    if (findUser) {
        console.log(req.body);
        axios({
            method: 'put',
            url: 'https://api.sandbox.mangopay.com/v2.01/' + config.clientID + '/CardRegistrations/' + req.body.data.Id ,
            data: {
                "RegistrationData" : req.body.data.data
            },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + access_token
            }
        })
            .then(async function (response) {
                return res.status(200).json({
                    text: "Succès",
                    cardId: response.data.Id
                });
            })
            .catch(function (error) {
                // handle error
                console.log(error);
                return res.status(400).json({ //Code à revoir
                    text: "Echec"
                });
            })
    }
}

async function get (req, res) {
    let access_token = await OAuth.ask(config.key);
    let user = jwt.decode(req.body.user, config.secret);
    let findUser = await Users.findOne({_id: user._id});
    if (findUser) {
        axios({
            method: 'get',
            url: 'https://api.sandbox.mangopay.com/v2.01/' + config.clientID + '/users/' + findUser.mangoId + '/cards/',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + access_token
            }
        })
            .then(async function (response) {
                return res.status(200).json({
                    text: "Succès",
                    "data": response.data,
                });
            })
            .catch(function (error) {
                // handle error
                console.log(error);
                return res.status(400).json({ //Code à revoir
                    text: "Echec"
                });
            })
    }
}

async function justPay (req, res) {
    let access_token = await OAuth.ask(config.key);
    let user = jwt.decode(req.body.user, config.secret);
    let findUser = await Users.findOne({_id: user._id});
    let findUser2 = await Users.findOne({pseudo: req.body.data.CreditedUser});
    if (findUser && findUser2) {
        let data = {
            "AuthorId": findUser.mangoId,
            "CreditedUserId": findUser2.mangoId,
            "CreditedWalletId": findUser2.mangoWalletId,
            "DebitedFunds": {
                "Currency": "EUR",
                "Amount": req.body.data.Amount
            },
            "Fees": {
                "Currency": "EUR",
                "Amount": 0
            },
            "SecureModeReturnURL": "http://localhost:3000/dashboard",
            "CardId": req.body.data.CardId,
        }
        console.log(data);
        axios({
            method: 'post',
            url: 'https://api.sandbox.mangopay.com/v2.01/' + config.clientID + '/payins/card/direct/',
            data: data,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + access_token
            }
        })
            .then(async function (response) {
                return res.status(200).json({
                    text: "Succès",
                    data: response.data
                });
            })
            .catch(function (error) {
                // handle error
                console.log(error);
                return res.status(400).json({ //Code à revoir
                    text: "Echec"
                });
            })
    }
}

exports.first = first;
exports.registration = registration;
exports.get = get;
exports.justPay = justPay;