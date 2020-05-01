const axios = require('axios');
const Users = require("../schema/schemaUsers.js");
const jwt = require("jwt-simple");
const config = require("../config/config");
const OAuth = require("./OAuth");

async function create (req, res){
    let access_token = await OAuth.ask(config.key);
    let user = jwt.decode(req.body.user, config.secret);
    let findUser = await Users.findOne({_id : user._id});
    if (findUser) {
        axios({
            method: 'post',
            url: 'https://api.sandbox.mangopay.com/v2.01/' + config.clientID + '/wallets/',
            data: {
                "Owners": [ findUser.mangoId ],
                "Description": findUser.pseudo + "'s Wallet",
                "Currency": "EUR",
            },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + access_token
            }
        })
            .then(function (response) {
                return res.status(200).json({
                    text: "Succès",
                    Balance: response.data.Balance
                });
            })
    }
}

async function get (req, res){
    let access_token = await OAuth.ask(config.key);
    let user = jwt.decode(req.query.user, config.secret);
    let findUser = await Users.findOne({_id : user._id});
    if (findUser) {
        axios({
            method: 'get',
            url: 'https://api.sandbox.mangopay.com/v2.01/' + config.clientID + /users/ + findUser.mangoId + '/wallets/',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + access_token
            }
        })
            .then(function (response) {
                return res.status(200).json({
                    text: "Succès",
                    Balance: response.data[0].Balance
                });
            })
            .catch(function (reason){
                console.log(reason);
            })
    }
}

exports.get = get;
exports.create = create;