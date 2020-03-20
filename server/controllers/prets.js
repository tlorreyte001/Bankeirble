const Prets = require("../schema/schemaPrets.js");
const Users = require("../schema/schemaUsers.js");
const jwt = require("jwt-simple");
const config = require("../config/config");
const mongoose = require("mongoose");

async function add (req, res) { // ajoute une demande de prêt dans la bdd

    let user = jwt.decode(req.body.user, config.secret);
    let findUser = await Users.findOne({_id : user._id});
    let nbDemandes = await Prets.find({_idEmprunteur : user._id, status: 0,  dateExp : { $gt : Date.now()} }).countDocuments(); // compte le nb de demandes de prêt d'un utilisateur encore valides

    if (findUser && (0 <= req.body.amount <= 700) && (1 <= req.body.num_months <= 12) && (nbDemandes < 5) ) {
       const pret = new Prets({ // paiement auto à ajouter
          id: 0,
          idPreteur : 0,
          _idEmprunteur : user._id,
          montant : req.body.amount,
          taux : Math.round((Math.pow(1.17852,req.body.num_months)-0.17852)*100)/100,
          duree : req.body.num_months,
          dateExp : Date.parse(req.body.expiration_date),
          status : 0, // 0 : en attente; 1 : en cours/accepté; 2 : terminé
          mensualite : 0
      });

      pret.save();
      console.log(user.pseudo, "demande un prêt !");
      return res.status(200).json({
          text: "Demande de prêt enregistrée !"
      });
    }

    else {
      console.log("\nRequête invalide !");
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
        prets_db = await Prets.find({status : 0, dateExp : { $gt : Date.now()} }); // demandes de prêt non expirées
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

async function transformLoans(prets){ // renvoie tous les éléments nécessaires au tableau du /accueil
    let loans = []; // sous la forme d'un tableau
    await Promise.all(prets.map(async (element) => {
        let pret = element._doc;
        let demandeur = await Users.findOne({ _id: pret._idEmprunteur });
        let ajout = {}; // éléments à ajouter à l'objet prêt : pseudo demandeur, gain pour le prêteur et nb de prêts en cours
        if (demandeur != null) {
            ajout = { ...pret,
              demandeur: demandeur.pseudo,
              gain: Math.round(((pret.taux)/100)*(pret.montant)*100)/100,
              nbPretsCours: demandeur.pretEnCours };
        }
        else {
            ajout = { ...pret, demandeur: '', gain: '', nbPretsCours: '' };
        }
        loans.push(ajout);
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
// A TESTER
async function accept_loan (req, res) { // met à jour la bdd après accord d'un prêt
    let user = jwt.decode(req.body.user, config.secret);
    let findUser = await Users.findOne({_id : user._id});
    if (findUser) {
      Prets.findByIdAndUpdate(req.body.id, {"status": 1, "_idPreteur": user._id},{}, function (err, res) { // màj du prêt
        // il faudra aussi modifier la date de début du prêt
          if (err) {
              throw err;
          }
          else {
            let idDemandeur = res._idEmprunteur;
          }
      });
      // à tester
      Users.findByIdAndUpdate(idDemandeur, { $inc: { pretEnCours: 1 }},{}, function (err) { // màj du nb de prêt en cours pour le demandeur
          if (err) {
              throw err;
          }
      });
      return res.status(200).json({
          text: "Prêt accepté !"
      });
    }
}

// A TESTER
async function arguments_taux(idDemandeur) { // renvoie un tableau d'arguments permettant le calcul du taux d'une demande de prêt
  let tab = [];
  let nbPretsTermines = await Prets.find({_idEmprunteur: idDemandeur, status: 2}).countDocuments(); // nb de prêts terminés par le demandeur
  let nbDemandes = await Prets.find({status: 0}).countDocuments(); // nb de demandes de prêts en cours
  Users.find({_id : idDemandeur}, {}, function (err, res) { // récupération des informations
      if (err) {
          throw err;
      }
      else {
          let args = {
            reputation: res.reputation, // réputation du demandeur
            nbPretsCours: res.pretEnCours, // nb de prêts en cours du demandeur
            nbPretsTermines: nbPretsTermines,
            nbDemandes: nbDemandes
          };
          tab.push(args);
      }
    });
  console.log(tab);
  return tab;
}

// A TESTER
async function remove(req, res) { // supprime une demande de prêt lorsque la requête est effectuée par le demandeur (bien sûr !)
  // à envoyer : pret et pret._id utilisé pour identifier la demande : à modifier si nécessaire
  let user = jwt.decode(req.body.user, config.secret);
  let findUser = await Users.findOne({_id : user._id});
  let findLoan = await Prets.findOne({_id : req.body.pret._id, _idEmprunteur : user._id}); // vérification : demandeur autorisé à supprimer son prêt
  if (findUser && findLoan) {
    Prets.remove({_id : req.body.pret._id})
    return res.status(200).json({
        text: "Demande de prêt supprimée"
    });
  }
  else {
    return res.status(400).json({
        text: "Requête invalide"
    });
  }
}


exports.add = add;
exports.get_all = get_all;
exports.get_all_available = get_all_available;
exports.get_by_user = get_by_user;
exports.accept_loan = accept_loan;
