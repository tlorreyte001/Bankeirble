const mongoose = require("mongoose");

const pretsSchema = mongoose.Schema(
  {
    _idPreteur: ObjectId,
    _idEmprunteur: ObjectId,
    montant: Number,
    taux: Number,
    duree: Number,
    dateExp: Date,
    status: Number,
    dateDepart: Date,
    mensualite: Number
  },
);

module.exports = mongoose.model("Prets", userSchema);