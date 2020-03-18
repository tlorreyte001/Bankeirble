const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    genre: String,
    nom: String,
    prenom: String,
    dateNaissance: Date,
    villeNaissance: String,
    adresse: {
      numRue: Number,
      rue: String,
      codePostal: Number,
      ville: String,
      autre: String
    },
    mailPerso: String,
    tel: String,
    pseudo: String,
    pretEnCours: Number,
    password: String,
    reputation : Number
  },
);

module.exports = mongoose.model("Users", userSchema);
