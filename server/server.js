//Définition des modules
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

//Connexion à la base de donnée
mongoose.connect("mongodb://localhost:27018/db", { useNewUrlParser: true,  useUnifiedTopology: true } );
// db : variable globale
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
console.log("\nConnecté à la bdd !");
});
module.exports = db;

//Définition des CORS
app.use(cors());

//Body Parser
const urlencodedParser = bodyParser.urlencoded({
    extended: true
});
app.use(urlencodedParser);
app.use(bodyParser.json());

// const Users = require("./schema/schemaUsers");
// app.get('/test', function (req, res, next){
//     const user = new Users({
//         mailPerso: "toto"
//     });
//     user.save();
// });


//Définition des routeurs
const router = express.Router();
app.use("/user", router);
require(__dirname + "/controllers/userController")(router);
app.use("/loan", router);
require(__dirname + "/controllers/loanController")(router);

//Définition et mise en place du port d'écoute
const port = 8800;
app.listen(port)
console.log("Listening on port", port);
