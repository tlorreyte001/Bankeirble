const mongoose = require("mongoose");

const pretsSchema = mongoose.Schema(
  {
    _idPreteur: String,
    _idEmprunteur: String,
    montant: Number,
    taux: Number,
    duree: Number,
    dateExp: Date,
    status: Number,
    dateDepart: Date,
    mensualite: Number,
    paiementAuto : Boolean,
    litige: String
  },
);

module.exports = mongoose.model("Prets", pretsSchema);
