const mongoose = require("mongoose");

const loansSchema = mongoose.Schema(
  {
    _idLender: String,
    _idBorrower: String,
    amount: Number,
    rate: Number,
    nbMonths: Number,
    expirationDate: Date,
    status: Number,
    date: Date,
    reimbursementAuto : Boolean
   },
);

module.exports = mongoose.model("Loans", loansSchema);
