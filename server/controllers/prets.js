const Prets = require("../schema/schemaPrets.js");
const db = require("../server.js");
const mongoose = require("mongoose");

module.exports = {
    add: function (req, res) {
      console.log("Un utilisateur demande un prêt !")
      const pret = new Prets({
          id: 0,
          idPreteur : 0,
          idEmpreteur : 0,
          montant : req.body.amount,
          taux : 0, // échelle à déterminer en fonction de num_months
          duree : req.body.num_months,
          dateExp : req.body.expiration_date,
          statut : "attente", // à voir si remplacement par entier
          dateDepart : Date.parse('01 Jan 1970 00:00:00 GMT'), // à modifier après acceptation du prêt
          mensualite : 0
      });
      pret.save();
      console.log("Demande de prêt enregistrée !");
    },
}
