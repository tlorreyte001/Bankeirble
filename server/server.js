//Définition des modules
const express = require("express"),
  mongoose = require("mongoose"),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  app = express(),
  fs = require('fs'),
  https = require('https');

//Connexion à la base de données
mongoose.connect("mongodb://myUserAdmin:Bankeirble@86.234.213.17:27017/admin", { useNewUrlParser: true,  useUnifiedTopology: true } );
const db = mongoose.connection;
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

//Définition des routeurs
const router = express.Router();
app.use("/user", router);
require(__dirname + "/controllers/userController")(router);
app.use("/loan", router);
require(__dirname + "/controllers/loanController")(router);

// Définition et mise en place du port d'écoute
const port = 8800;

// TLS
// const server = https.createServer({
//   key: fs.readFileSync('./certificates/key.pem'),
//   cert: fs.readFileSync('./certificates/cert.pem')
// }, app);
// server.listen(port);

app.listen(port);
console.log("Listening on port", port);
