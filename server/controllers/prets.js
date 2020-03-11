const Prets = require("../schema/schemaPrets.js");
const jwt = require("jwt-simple");
const config = require("../config/config");

async function add (req, res) {
    const user = jwt.decode(req.body.user, config.secret);
    const pret = new Prets({
        id: 0,
        idPreteur : 0,
        idEmpreteur : user._id,
        montant : req.body.amount,
        taux : 0, // échelle à déterminer en fonction de num_months
        duree : req.body.num_months,
        dateExp : req.body.expiration_date,
        statut : "attente", // à voir si remplacement par entier
        dateDepart : Date.parse('01 Jan 1970 00:00:00 GMT'), // à modifier après acceptation du prêt
        mensualite : 0
    });
    pret.save();
    console.log(user._id, "demande un prêt !");
    return res.status(200).json({
        text: "Demande de prêt enregistrée !"
    });
}

async function get_all (req, res) {
    const query = Prets.find({});
    query.exec(function (err, prets) {
        if (err) {
            throw err;
        }
        return res.status(200).json({
            loans: prets
        });
    });
}

async function get_by_user (req, res) {
    const user = jwt.decode(req.body.user, config.secret);
    const query = Prets.find({"idEmpreteur" : user._id,});
    query.exec(function (err, prets) {
        if (err) {
            throw err;
        }
        return res.status(200).json({
            loans: prets
        });
    });
}

async function accept_loan (req, res) {
    const user = jwt.decode(req.body.user, config.secret);
    Prets.findByIdAndUpdate(req.body.id, {"status": 0, "_idPreteur": user._id},{}, function (err) {
        if (err) {
            throw err;
        }
        return res.status(200).json({
            text: "Prêt acceptée !"
        });
    });
}

exports.add = add;
exports.get_all = get_all;
exports.get_by_user = get_by_user;
exports.accept_loan = accept_loan;
