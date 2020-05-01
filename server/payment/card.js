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
                    "CardRegistrationURL":  response.data.CardRegistrationURL
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