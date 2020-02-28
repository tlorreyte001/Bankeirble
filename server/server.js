//Définition des modules
const express = require("express"); 
const mongoose = require("mongoose"); 
const bodyParser = require('body-parser');

//Connexion à la base de donnée
mongoose.connect("mongodb://localhost/db");

//On définit notre objet express nommé app
const app = express();

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
//         nom:"Test"
//     });
//     user.save();
//     console.log("ok");
// });

//Définition du routeur
const router = express.Router();
app.use("/user", router);
require(__dirname + "/controllers/userController")(router);
app.use("/pret", router);
require(__dirname + "/controllers/pretController")(router);

//Définition et mise en place du port d'écoute
const port = 8800;
app.listen(port)
console.log("Listening on port", port);
