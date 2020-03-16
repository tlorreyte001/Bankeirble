const Prets = require("../schema/schemaPrets.js");
const Users = require("../schema/schemaUsers.js");
const jwt = require("jwt-simple");
const config = require("../config/config");
const mongoose = require("mongoose");

async function add (req, res) { // ajoute une demande de prêt dans la bdd
    let user = jwt.decode(req.body.user, config.secret);
    let findUser = await Users.findOne({_id : user._id}); //mongoose.Types.ObjectId("5e5c1d0ee4bee76ce584b7c8")
    if (findUser) {
      const pret = new Prets({
          id: 0,
          idPreteur : 0,
          _idEmprunteur : user._id,
          montant : req.body.amount,
          taux : Math.round((Math.pow(1.17852,req.body.num_months)-0.17852)*100)/100,
          duree : req.body.num_months,
          dateExp : req.body.expiration_date,
          status : 0, // 0 : en attente; 1 : en cours/accepté; 2 : terminé
          dateDepart : Date.parse('01 Jan 1970 00:00:00 GMT'), // à modifier après acceptation du prêt
          mensualite : 0
      });
      pret.save();
      console.log(user._id, "demande un prêt !");
      return res.status(200).json({
          text: "Demande de prêt enregistrée !"
      });
    }
    else {
      console.log("\nUtilisateur non reconnu !");
      return res.status(400).json({
          text: "Requête invalide"
      });
   }
}

async function get_all (req, res) { // renvoie l'ensemble des prêts enregistrés dans la bdd
    let user = jwt.decode(req.body.user, config.secret);
    let findUser = await Users.findOne({_id : user._id});
    if (findUser) {
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
    else {
      console.log("\nUtilisateur non reconnu !");
      return res.status(400).json({
          text: "Requête invalide"
      });
    }
}


async function get_all_available (req, res) { // renvoie l'ensemble des prêts en attente d'acceptation
    let user = jwt.decode(req.body.user, config.secret);
    let findUser = await Users.findOne({_id : user._id});
    let loans = [];
    let prets_db = [];
    if (findUser) {
      const query = Prets.find({status : 0});
    //   await query.exec(async function (err, prets) {
    //       if (err) {
    //           throw err;
    //       }
    //   });
        prets_db = await Prets.find({status : 0});
        await transformLoans(prets_db).then((res)=>{
            loans = [...res];
        });
        return res.status(200).json({
            loans: loans
        });
    }
    else {
      console.log("\nUtilisateur non reconnu !");
      return res.status(400).json({
          text: "Requête invalide"
      });
    }
}

async function transformLoans(prets){
    let loans = [];
    await Promise.all(prets.map(async (element) => {
        let pret = element._doc;
        let demandeur = await Users.findOne({ _id: pret._idEmprunteur });
        let loan = {};
        if (demandeur != null) {
            loan = { ...element._doc, demandeur: demandeur.pseudo };
        }
        else {
            loan = { ...element._doc, demandeur: '' };
        }
        loans.push(loan);
      }));
    return loans;
}

async function get_by_user (req, res) { // renvoie l'ensemble des prêts enregistrés dans la bdd effectués par un utilisateur donné
    let user = jwt.decode(req.body.user, config.secret);
    let findUser = await Users.findOne({_id : user._id});
    if (findUser) {
      query.exec(function (err, prets) {
          if (err) {
              throw err;
          }
          return res.status(200).json({
              loans: prets
          });
      });
    }
    else {
      console.log("\nUtilisateur non reconnu !");
      return res.status(400).json({
          text: "Requête invalide"
      });
    }
}

async function accept_loan (req, res) { // met à jour la bdd après accord d'un prêt
    let user = jwt.decode(req.body.user, config.secret);
    let findUser = await Users.findOne({_id : user._id});
    if (findUser) {
      Prets.findByIdAndUpdate(req.body.id, {"status": 1, "_idPreteur": user._id},{}, function (err) {
          if (err) {
              throw err;
          }
          return res.status(200).json({
              text: "Prêt accepté !"
          });
      });
    }
}

exports.add = add;
exports.get_all = get_all;
exports.get_all_available = get_all_available;
exports.get_by_user = get_by_user;
exports.accept_loan = accept_loan;
