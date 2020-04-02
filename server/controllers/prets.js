const Prets = require("../schema/schemaPrets.js");
const Users = require("../schema/schemaUsers.js");
const jwt = require("jwt-simple");
const config = require("../config/config");
const mongoose = require("mongoose");
const path = require('path');
var pdf = require("pdf-creator-node");
var fs = require('fs');
const certPath = path.join(__dirname, '../config/pdf.html');
const cert = fs.readFileSync(certPath, 'utf8');

async function nb_demandes(req, res) { //renvoie le nb de demandes en cours : nécessaire au calcul du taux pour une demande de prêt
  let user = jwt.decode(req.body.user, config.secret);
  let findUser = await Users.findOne({ _id: user._id });
  if (findUser) {
    let nbDemandes = await Prets.find({ status: 0 }).countDocuments(); // nb de demandes de prêts en cours
    return res.status(200).json({
      text: "Succès",
      nbDemandesEnCours: nbDemandes
    });
  }
  else {
    return res.status(400).json({
      text: "Requête invalide"
    });
  }
}

async function verif_info(req, res) { // teste si le demandeur a déjà donné les infos nécessaires à la constitution du contrat (1ere demande ou non)
  let user = jwt.decode(req.body.user, config.secret);
  let findUser = await Users.findOne({ _id: user._id });
  if (findUser) {

    if (user.dateNaissance === null) { // test sur un seul champ
      return res.status(402).json({
        text: "Infor,mations manquantes"
      });
    }

    else { // toutes les infos sont présentes
      return res.status(200).json({
        text: "Succès"
      });
    }
  }

  else {
    return res.status(400).json({
      text: "Requête invalide"
    });
  }
}

async function add_info(req, res) { // ajoute les infos complémentaires nécessaires au contrat dans la bdd
  let user = jwt.decode(req.body.user, config.secret);
  let findUser = await Users.findOne({ _id: user._id });
  if (findUser) {
    await Users.findByIdAndUpdate(user._id, {
      "adresse": req.body.adresse, // doute pour adresse : enregistrement du json ou besoin de le faire champ par champ ?
      "nomNaissance": req.body.nomDeNaissance, // pê null
      "genre": req.body.genre,
      "dateNaissance": req.body.dateNaissance,
      "lieuNaissance": req.body.lieuNaissance
    },
      { useFindAndModify: false },
      function (err) { // màj des infos de l'utilisateur
        if (err) {
          throw err;
        }
      });
    return res.status(200).json({
      text: "Succès"
    });
  }
  else {
    return res.status(400).json({
      text: "Requête invalide"
    });
  }
}

async function add(req, res) { // ajoute une demande de prêt dans la bdd
   let user = jwt.decode(req.body.user, config.secret);
   let findUser = await Users.findOne({_id : user._id});
   let nbDemandes = await Prets.find({_idEmprunteur : user._id, status: 0,  dateExp : { $gt : Date.now()} }).countDocuments(); // compte le nb de demandes de prêt d'un utilisateur encore valides

   if (findUser && (0 <= req.body.amount <= 700) && (1 <= req.body.num_months <= 12) && (nbDemandes < 5) ) {
     // let taux = calcul_taux(req,res);
      const pret = new Prets({ // paiement auto à ajouter
         id: 0,
         idPreteur : 0,
         _idEmprunteur : user._id,
         montant : req.body.amount,
         taux : Math.round((Math.pow(1.17852,req.body.num_months)-0.17852)*100)/100,
         duree : req.body.num_months,
         dateExp : Date.parse(req.body.expiration_date),
         status : 0, // 0 : en attente; 1 : en cours/accepté; 2 : terminé
         mensualite : 0,
         paiementAuto : req.body.remb_auto
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

async function get_all(req, res) { // renvoie l'ensemble des prêts enregistrés dans la bdd
  let user = jwt.decode(req.body.user, config.secret);
  let findUser = await Users.findOne({ _id: user._id });
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


async function get_all_available(req, res) { // renvoie l'ensemble des prêts en attente d'acceptation
  let user = jwt.decode(req.body.user, config.secret);
  let findUser = await Users.findOne({ _id: user._id });
  let loans = [];
  let prets_db = [];
  if (findUser) {
    prets_db = await Prets.find({ status: 0, dateExp: { $gt: Date.now() } }); // demandes de prêt non expirées
    await transformLoans(prets_db).then((res) => {
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

async function transformLoans(prets) { // renvoie tous les éléments nécessaires au tableau du /accueil
  let loans = []; // sous la forme d'un tableau
  await Promise.all(prets.map(async (element) => {
    let pret = element._doc;
    let demandeur = await Users.findOne({ _id: pret._idEmprunteur });
    let ajout = {}; // éléments à ajouter à l'objet prêt : pseudo demandeur, gain pour le prêteur et nb de prêts en cours
    if (demandeur != null) {
      ajout = {
        ...pret,
        demandeur: demandeur.pseudo,
        gain: Math.round(((pret.taux) / 100) * (pret.montant) * 100) / 100,
        nbPretsCours: demandeur.pretEnCours
      };
    }
    else {
      ajout = { ...pret, demandeur: '', gain: '', nbPretsCours: '' };
    }
    loans.push(ajout);
  }));
  return loans;
}

async function get_by_user(req, res) { // renvoie l'ensemble des prêts enregistrés dans la bdd effectués par un utilisateur donné
  let user = jwt.decode(req.body.user, config.secret);
  let findUser = await Users.findOne({ _id: user._id });
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

async function accept_loan(req, res) { // met à jour la bdd après accord d'un prêt
  let user = jwt.decode(req.body.user, config.secret);
  let findUser = await Users.findOne({ _id: user._id });
  if (findUser) {
    await Prets.findByIdAndUpdate(req.body.idLoan, { "status": 1, "_idPreteur": user._id }, { useFindAndModify: false }, function (err) { // màj du prêt
      // il faudra aussi modifier la date de début du prêt
      if (err) {
        throw err;
      }
    });
    await Prets.findById(req.body.idLoan, {}, function (err, loan) {
      Users.findByIdAndUpdate(loan._idEmprunteur, { $inc: { pretEnCours: 1 } }, { useFindAndModify: false }, function (err) { // màj du nb de prêt en cours pour le demandeur
        if (err) {
          throw err;
        }
      });
    });
    return res.status(200).json({
      text: "Prêt accepté !"
    });
  }
  else {
    return res.status(400).json({
      text: "Requête invalide"
    });
  }
}

async function calcul_taux(req, res) { // calcule le taux pour une certaine demande de prêt
  let user = jwt.decode(req.body.user, config.secret);
  let findUser = Users.findOne({ _id: user._id });
  if (findUser) {
    // let nbDemandes = Prets.find({status: 0}).countDocuments(); // nb de demandes de prêts en cours : pour calcul de x et y
    let x = 3;
    let y = 6;
    // let nbPretsTermines = Prets.find({_idEmprunteur:user._id, status: 2}).countDocuments(); // nb de prêts terminés par le demandeur
    let dateExpiration = new Date(req.body.expiration_date);
    let dateActuelle = new Date(Date.now());
    let joursExpiration = Math.round((dateExpiration.getTime() - dateActuelle.getTime()) / (8.64 * Math.pow(10, 7)));
    let l = 0.35 * (1 - (joursExpiration / 30)) + 0.25 * (parseInt(req.body.num_months) / 12) + 0.25 * (1 - ((parseInt(user.reputation) + 50) / 100)) + 0.1 * (parseInt(user.pretEnCours) / 5) + 0.05 * parseInt(req.body.amount) / 700;
    let taux = Math.round((((1 - l) * x + l * y) * 100)) / 100;
    return taux;
    return res.status(200).json({
      taux: taux
    });
  }
  else {
    return res.status(400).json({
      text: "Requête invalide"
    });
  }



}

async function remove_loan(req, res) { // supprime une demande de prêt lorsque la requête est effectuée par le demandeur (bien sûr !)
  // à envoyer : idLoan
  let user = jwt.decode(req.body.user, config.secret);
  let findUser = await Users.findOne({ _id: user._id });
  let findLoan = await Prets.findOne({ _id: req.body.idLoan, _idEmprunteur: user._id }); // vérification : demandeur autorisé à supprimer son prêt
  if (findUser && findLoan) {
    await Prets.deleteOne({ _id: req.body.idLoan });
    console.log("Demande de prêt supprimée");
    return res.status(200).json({
      text: "Demande de prêt supprimée"
    });
  }
  else {
    console.log("Echec de la suppression de demande de prêt");
    return res.status(400).json({
      text: "Requête invalide"
    });
  }
}

async function generateContract(req, res) { 
  var options = {
    format: "A3",
    orientation: "portrait",
    border: "10mm",
    // header: {
    //   height: "45mm",
    //   contents: '<div style="text-align: center;">Author: Shyam Hajare</div>'
    // },
    // "footer": {
    //   "height": "28mm",
    //   "contents": {
    //     first: 'Cover page',
    //     2: 'Second page', // Any page number is working. 1-based index
    //     default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
    //     last: 'Last Page'
    //   }
    // }
  };
  var users = [
    {
      name: "Shyam",
      age: "26"
    },
    {
      name: "Navjot",
      age: "26"
    },
    {
      name: "Vitthal",
      age: "26"
    }
  ]
  var document = {
    html: cert,
    data: {
      users: users
    },
    path: "./contract.pdf"
  };
  pdf.create(document, options)
    .then(file => {
      console.log(file)
      res.download(file.filename);
    })
    .catch(error => {
      console.error(error)
    });

}

exports.nb_demandes = nb_demandes;
exports.add = add;
exports.get_all = get_all;
exports.get_all_available = get_all_available;
exports.get_by_user = get_by_user;
exports.accept_loan = accept_loan;
exports.remove_loan = remove_loan;
exports.calcul_taux = calcul_taux;
exports.generateContract = generateContract;
