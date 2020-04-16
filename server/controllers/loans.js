const Loans = require("../schema/schemaLoans.js");
const Users = require("../schema/schemaUsers.js");
const Rates = require("../schema/schemaRates.js");
const jwt = require("jwt-simple");
const config = require("../config/config");
const mongoose = require("mongoose");
const path = require('path');
const crypto = require('crypto');
var pdf = require("pdf-creator-node");
var fs = require('fs');
const templatePath = path.join(__dirname, '../models/pdf.html');
const template = fs.readFileSync(templatePath, 'utf8');


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

async function get_by_user (req, res) { // renvoie l'ensemble des prêts enregistrés dans la bdd effectués par un utilisateur donné
  let user = jwt.decode(req.query.user, config.secret);
  let findUser = await Users.findOne({_id : user._id});
  let loans = [];
  let prets_db = [];
  if (findUser) {
      loans = await Loans.find({_idBorrower : user._id, status : 0, expirationDate : { $gt : Date.now()} },
      {_id: true, amount: true , rate: true , nbMonths: true, expirationDate: true, reimbursementAuto : true}); // demandes de prêt non expirées
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

async function add (req, res) { // ajoute une demande de prêt dans la bdd

    let user = jwt.decode(req.body.user, config.secret);
    let findUser = await Users.findOne({_id : user._id});
    let nbDemandes = await Loans.find({_idBorrower : user._id, status: 0,  expirationDate : { $gt : Date.now()} }).countDocuments(); // compte le nb de demandes de prêt d'un utilisateur encore valides

    if (findUser && (0 <= req.body.amount <= 700) && (1 <= req.body.num_months <= 12)) {

      if (nbDemandes < 5) {
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

       // ajout du taux proposé dans la bdd

       const rate = new Rates ({
         rate : req.body.rate,
         date : new Date(Date.now())
       });
       rate.save();

       return res.status(200).json({
           text: "Success"
       });
      }

      else { // nb de demandes de prêt en cours limitées à 5 par utilisateur
        return res.status(408).json({
            text: "Too many requests"
        });
      }
    }

    else {
      return res.status(401).json({
          text: "Access token is missing or invalid"
      });
   }

}

async function rate (req, res) { // renvoie l'historique des taux appliqués
  let user = jwt.decode(req.query.user, config.secret);
  let findUser = await Users.findOne({_id : user._id});
  if (findUser) {
    rates = await Rates.find({}, {date : true, rate : true});
    // moyenne des taux pour un même jour ??
    return res.status(200).json({
      text: "Success",
      rates : rates
    });
  }
  else {
    return res.status(401).json({
        text: "Access token is missing or invalid"
    });
  }
}

async function get_all_available (req, res) { // renvoie l'ensemble des prêts en attente d'acceptation
    let user = jwt.decode(req.query.user, config.secret);
    let findUser = await Users.findOne({_id : user._id});
    let loans = [];
    let prets_db = [];
    if (findUser) {
        prets_db = await Loans.find({status : 0, expirationDate : { $gt : Date.now()} },
        {_id: true, _idBorrower: true, amount: true , rate: true , nbMonths: true, expirationDate: true}); // demandes de prêt non expirées
        await transformLoans(prets_db).then((res)=>{
            loans = [...res];
        });
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
        let demandeur = await Users.findOne({ _id: pret._idBorrower});
        delete pret["_idBorrower"];
        let ajout = {}; // éléments à ajouter à l'objet prêt : pseudo demandeur, gain pour le prêteur
        if (demandeur !== null) {
            ajout = { ...pret,
              pseudo: demandeur.pseudo
            }
        }
        else {
            ajout = { ...pret, pseudo: ''};
        }
        loans.push(ajout);
      }));
    return loans;
}

async function accept_loan (req, res) { // met à jour la bdd après accord d'un prêt
    let user = jwt.decode(req.body.user, config.secret);
    let findUser = await Users.findOne({_id : user._id});

    if (findUser) {
      let loanId = req.body.loanId;
      await Loans.findByIdAndUpdate(loanId, {"status": 1, "_idLender": user._id, "date": new Date(Date.now()) }, {useFindAndModify : false}, function (err) { // màj du prêt
        // il faudra aussi modifier la date de début du prêt
          if (err) {
              throw err;
          }
      });
      //on génére le contrat correspondant
      await generate_contract(loanId).then(
        ()=>{
          console.log('Contrat généré !');
        }
      );

      // hash du contrat généré
      let hash = crypto.createHash('sha256');
      let filename = await Loans.find({_id: loanId}, {contractPath: true});
      let contract = fs.readFileSync(filename[0].contractPath);
      let hashContract = crypto.createHash('sha256').update(contract.toString()).digest('hex');

      // on renvoie le hash pour le conserver sur la BC
      return res.status(200).json({
          text: "Success",
          hashContract: hashContract
      });
    }
    else {
      return res.status(401).json({
          text: "Access token is missing or invalid"
      });
    }
}

async function generate_contract (loanId) {
  let loan = await Loans.findOne({_id : loanId}); // recuperation du pret a partir de l'id
  let today = `${(new Date().getDate()<10)?`0${new Date().getDate()}`:new Date().getDate()}/${(new Date().getMonth()+1<10)?`0${new Date().getMonth()+1}`:new Date().getMonth()+1}/${new Date().getFullYear()}`
  if (loan) {
    let lender = await Users.findOne({_id : loan._idLender}); // preteur
    let borrower = await Users.findOne({_id : loan._idBorrower}); //demandeur
    // options reltives au pdf
    var options = {
      format: "A3",
      orientation: "portrait",
      border: "10mm"
    };
    // construction du pdf a partir du template "html" + injection des données dans "data"
    var document = {
      html: template,
      data: {
        date: today,preteur_FN: lender.firstName,preteur_LN: lender.lastName,preteur_DN: `${(new Date(lender.birthDate).getDate()<10)?`0${new Date(lender.birthDate).getDate()}`:new Date(lender.birthDate).getDate()}/${(new Date(lender.birthDate).getMonth()+1<10)?`0${new Date(lender.birthDate).getMonth()+1}`:new Date(lender.birthDate).getMonth()+1}/${new Date(lender.birthDate).getFullYear()}`,
        preteur_naissance: lender.birthPlace,preteur_rue: `${lender.address.street}`,preteur_CP: lender.address.postcode, preteur_ville: lender.address.city,
        debiteur_FN: borrower.firstName,debiteur_LN: borrower.lastName,debiteur_DN: `${(new Date(borrower.birthDate).getDate()<10)?`0${new Date(borrower.birthDate).getDate()}`:new Date(borrower.birthDate).getDate()}/${(new Date(borrower.birthDate).getMonth()+1<10)?`0${new Date(borrower.birthDate).getMonth()+1}`:new Date(borrower.birthDate).getMonth()+1}/${new Date(borrower.birthDate).getFullYear()}`,
        debiteur_naissance: borrower.birthPlace,debiteur_rue: borrower.address.street,debiteur_CP: borrower.address.postcode, debiteur_ville: borrower.address.city,
        montant:loan.amount,mensualite:loan.nbMonths,taux:loan.rate,expiration_date:`${(new Date(loan.expirationDate).getDate()<10)?`0${new Date(loan.expirationDate).getDate()}`:new Date(loan.expirationDate).getDate()}/${(new Date(loan.expirationDate).getMonth()+1<10)?`0${new Date(loan.expirationDate).getMonth()+1}`:new Date(loan.expirationDate).getMonth()+1}/${new Date(loan.expirationDate).getFullYear()}`
      },
      path: `./files/${makeUniqueId(9)}.pdf`
    };
    //creation du pdf
    pdf.create(document, options)
      .then(async file => {
        // sauvegarder le path du contrat généré
        await Loans.findByIdAndUpdate(loanId, {"contractPath": file.filename}, {useFindAndModify : false}, function (err) {
            if (err) {
                throw err;
            }
        });
      })
      .catch(error => {
        console.error(error)
      });
  }
  else {
    return null;
  }
}

function makeUniqueId(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
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
    let user = jwt.decode(req.body.user, config.secret);
    let findUser = await Users.findOne({_id : user._id});
    let loanId = req.body.loanId;
    let loan = await Loans.findOne({_id : loanId}); // recuperation du pret a partir de l'id
    if (findUser && loan) {
      // telecharger le contrat à partir du path et le renvoyer coté client
      res.download(loan.contractPath);
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
exports.get_by_user = get_by_user;
exports.add = add;
exports.rate = rate;
exports.get_all_available = get_all_available;
exports.accept_loan = accept_loan;
exports.remove_loan = remove_loan;
exports.get_contract = get_contract;

// Fonction potentiellement utile pour plus tard ...

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
