const Loans = require("../schema/schemaLoans.js");
const Users = require("../schema/schemaUsers.js");
const jwt = require("jwt-simple");
const config = require("../config/config");
const mongoose = require("mongoose");


async function nbRequest (req, res) { // renvoie le nb de demandes en cours : nécessaire au calcul du taux pour une demande de prêt
  let user = jwt.decode(req.query.user, config.secret);
  let findUser = await Users.findOne({_id : user._id});
  if (findUser) {
     let nbDemandes = await Loans.find({status: 0}).countDocuments(); // nb de demandes de prêts en cours
     return res.status(200).json({
         text: "Success",
         nbLoanRequest : nbDemandes
     });
  }
  else {
    return res.status(401).json({
        text: "Access token is missing or invalid"
    });
  }
}

async function add (req, res) { // ajoute une demande de prêt dans la bdd

    let user = jwt.decode(req.body.user, config.secret);
    let findUser = await Users.findOne({_id : user._id});
    let nbDemandes = await Loans.find({_idBorrower : user._id, status: 0,  expirationDate : { $gt : Date.now()} }).countDocuments(); // compte le nb de demandes de prêt d'un utilisateur encore valides

    if (findUser && (0 <= req.body.amount <= 700) && (1 <= req.body.num_months <= 12) && (nbDemandes < 5) ) {

       const loan = new Loans({
          _idBorrower : user._id,
          amount : req.body.amount,
          rate : req.body.rate,
          nbMonths : req.body.nbMonths,
          expirationDate : Date.parse(req.body.expirationDate),
          status : 0, // 0 : en attente; 1 : en cours/accepté; 2 : terminé
          reimbursementAuto : req.body.reimbursementAuto
      });

      loan.save();
      console.log(user.pseudo, "demande un prêt !");
      return res.status(200).json({
          text: "Success"
      });
    }

    else {
      return res.status(401).json({
          text: "Access token is missing or invalid"
      });
   }

}

async function rate (req, res) { // renvoie l'historique des taux appliqués
  return res.status(200).json({
      text: "Success"
  });
}

async function get_all_available (req, res) { // renvoie l'ensemble des prêts en attente d'acceptation
    let user = jwt.decode(req.query.user, config.secret);
    let findUser = await Users.findOne({_id : user._id});
    let loans = [];
    let prets_db = [];
    if (findUser) {
        prets_db = await Loans.find({status : 0, expirationDate : { $gt : Date.now()} }); // demandes de prêt non expirées
        await transformLoans(prets_db).then((res)=>{
            loans = [...res];
        });
        console.log(loans);
        return res.status(200).json({
            loans: loans
        });
    }
    else {
      console.log("\nUtilisateur non reconnu !");
      return res.status(401).json({
          text: "Access token is missing or invalid"
      });
    }
}

async function transformLoans(prets) { // renvoie tous les éléments nécessaires au tableau du /accueil
    let loans = []; // sous la forme d'un tableau
    await Promise.all(prets.map(async (element) => {
        let pret = element._doc;
        let demandeur = await Users.findOne({ _id: pret._idBorrower });
        let ajout = {}; // éléments à ajouter à l'objet prêt : pseudo demandeur, gain pour le prêteur et nb de prêts en cours
        if (demandeur != null) {
            ajout = { ...pret,
              demandeur: demandeur.pseudo,
              gain: Math.round(((pret.rate)/100)*(pret.amount)*100)/100,
              nbPretsCours: demandeur.pretEnCours };
        }
        else {
            ajout = { ...pret, demandeur: '', gain: '', nbPretsCours: '' };
        }
        loans.push(ajout);
      }));
    return loans;
}

async function accept_loan (req, res) { // met à jour la bdd après accord d'un prêt
    let user = jwt.decode(req.body.user, config.secret);
    let findUser = await Users.findOne({_id : user._id});
    if (findUser) {
      await Loans.findByIdAndUpdate(req.body.loanId, {"status": 1, "_idLender": user._id}, {useFindAndModify : false}, function (err) { // màj du prêt
        // il faudra aussi modifier la date de début du prêt
          if (err) {
              throw err;
          }
      });
      // await Loans.findById(req.body.LoanId, {}, function (err, loan) {
      //   Users.findByIdAndUpdate(loan._idBorrower, { $inc: { pretEnCours: 1 }}, {useFindAndModify : false}, function (err) { // màj du nb de prêt en cours pour le demandeur
      //   if (err) {
      //       throw err;
      //     }
      //   });
      // });
      return res.status(200).json({
          text: "Success"
      });
    }
    else {
      return res.status(401).json({
          text: "Access token is missing or invalid"
      });
    }
}

async function remove_loan(req, res) { // supprime une demande de prêt lorsque la requête est effectuée par le demandeur (bien sûr !)

  let user = jwt.decode(req.query.user, config.secret);
  let findUser = await Users.findOne({_id : user._id});
  let findLoan = await Loans.findOne({_id : req.query.loanId, _idBorrower : user._id}); // vérification : demandeur autorisé à supprimer son prêt
  if (findUser && findLoan) {
    await Loans.deleteOne({_id : req.query.loanId});
    console.log("Demande de prêt supprimée");
  }
  else {
    return res.status(401).json({
        text: "Access token is missing or invalid"
    });
  }
}

async function get_contract (req, res) { // envoie le contrat en cas de litige
    let user = jwt.decode(req.query.user, config.secret);
    let findUser = await Users.findOne({_id : user._id});
    if (findUser) {
      return res.status(200).json({
          text: "Success"
      });
    }
    else {
      return res.status(401).json({
          text: "Access token is missing or invalid"
      });
    }
}


exports.nbRequest = nbRequest;
exports.add = add;
exports.rate = rate;
exports.get_all_available = get_all_available;
exports.accept_loan = accept_loan;
exports.remove_loan = remove_loan;
exports.get_contract = get_contract;

// à mettre côté client !

async function calcul_taux(req, res) { // calcule le taux pour une certaine demande de prêt
  let user = jwt.decode(req.body.user, config.secret);
  let findUser = Users.findOne({_id : user._id});
  if (findUser) {
    // let nbDemandes = Loans.find({status: 0}).countDocuments(); // nb de demandes de prêts en cours : pour calcul de x et y
    let x = 3;
    let y = 6;
    // let nbPretsTermines = Loans.find({_idBorrower:user._id, status: 2}).countDocuments(); // nb de prêts terminés par le demandeur
    let dateExpiration = new Date(req.body.expiration_date);
    let dateActuelle = new Date(Date.now());
    let joursExpiration = Math.round( (dateExpiration.getTime() - dateActuelle.getTime() ) / (8.64*Math.pow(10,7)) );
    let l = 0.35 * (1 - (joursExpiration / 30)) + 0.25 * (parseInt(req.body.num_months) / 12) + 0.25 * (1 - ((parseInt(user.reputation) + 50) / 100)) + 0.1 * (parseInt(user.pretEnCours) / 5) + 0.05 * parseInt(req.body.amount) / 700;
    let taux = Math.round((((1 - l) * x + l * y)*100))/100;
    return taux;
    return res.status(200).json({
        rate: taux
    });
  }
  else {
    return res.status(400).json({
        text: "Requête invalide"
    });
  }

}


// Fonctions potentiellement utiles pour plus tard ...

async function get_all (req, res) { // renvoie l'ensemble des prêts enregistrés dans la bdd
    let user = jwt.decode(req.body.user, config.secret);
    let findUser = await Users.findOne({_id : user._id});
    if (findUser) {
      const query = Loans.find({});
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
