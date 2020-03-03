//Définition des modules
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const app = express();

//Connexion à la base de donnée
mongoose.connect("mongodb://localhost:27018/db", { useNewUrlParser: true,  useUnifiedTopology: true } );
// db : variable globale
const db = mongoose.connection;
module.exports = db;

//Body Parser
const urlencodedParser = bodyParser.urlencoded({
    extended: true
});
app.use(urlencodedParser);
app.use(bodyParser.json());

//Définition des CORS
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// const Users = require("./schema/schemaUsers");
// app.get('/test', function (req, res, next){
//     const user = new Users({
//         chien: "toto"
//     });
//     user.save();
//     console.log("ok");
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
