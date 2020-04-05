const mongoose = require("mongoose");

const ratesSchema = mongoose.Schema(
  {
     rate : Number,
     date : Date
   },
 );

 module.exports = mongoose.model("Rates", ratesSchema);
