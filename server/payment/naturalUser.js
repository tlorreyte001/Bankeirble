const axios = require('axios');
const Users = require("../schema/schemaUsers.js");
const jwt = require("jwt-simple");
const config = require("../config/config");
const OAuth = require("./OAuth");

async function create (req, res) {
    let access_token = await OAuth.ask(config.key);
    let user = jwt.decode(req.body.user, config.secret);
    let findUser = await Users.findOne({_id : user._id});
    if (findUser) {
        // Creation d'un Mango Natural User
        axios({
            method: 'post',
            url: 'https://api.sandbox.mangopay.com/v2.01/' + config.clientID + '/users/natural/',
            data: {
                "FirstName": findUser.firstName,
                "LastName": findUser.lastName,
                "Birthday": 1463496101, // à modifier
                "Nationality": "FR",
                "CountryOfResidence": "FR",
                "Email": findUser.email
            },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + access_token
            }
        })
            .then(async function (response) {
                // Si succès : ajout de de l'id mangopay dans la bdd
                console.log("Utilisateur ajouté a MangoPay !");
                await Users.findByIdAndUpdate(user._id, {
                    "mangoId" : response.data.Id
                    },
                    {useFindAndModify : false},
                    function (err) { // màj des infos de l'utilisateur
                        if (err) {
                            throw err;
                        }
                    });
                return res.status(200).json({
                    text: "Succès",
                    mangoId: response.data.Id
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

async function check (req, res) {
    let user = jwt.decode(req.query.user, config.secret);
    let findUser = await Users.findOne({_id : user._id});
    if (findUser) {
        // Check si le client à un Id mango
        if(findUser.mangoId) {
            return res.status(200).json({
                text: "Succès",
                mangoId: findUser.mangoId
            });
        }
        else {
            return res.status(400).json({ //Code à revoir
                text: "Echec"
            });
        }
    }
}

exports.create = create;
exports.check = check;
