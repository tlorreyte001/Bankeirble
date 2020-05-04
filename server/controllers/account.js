const Users = require("../schema/schemaUsers.js");
const passwordHash = require("password-hash");
const jwt = require("jwt-simple");
const config = require("../config/config");
const fs = require('fs');
const axios = require('axios');

const filename = "pseudo";

function find_pseudo(num) {
  let file = fs.readFileSync(__dirname+'/'+filename).toString();
  let pseudos = file.split(',\r\n');
  return pseudos[num];
}

async function signup (req, res) {

    let num = await Users.find({}).countDocuments(); // compte le nombre d'utilisateurs dans la base de données
    const user = {
        lastName : req.body.lastName,
        firstName : req.body.firstName,
        pseudo : find_pseudo(num),
        email: req.body.email,
        password: passwordHash.generate(req.body.password)
    };

    //Cas où un des champs obligatoires est nul
    // if (user.password === "" || user.email === "") {
    //     return res.status(400).json({
    //         text: "Requête invalide"
    //     });
    // }

    let findUser = await Users.findOne({email: user.email});

    if (findUser) {
        return res.status(405).json({
            text: "User already exists",
        });
    }

    // Sauvegarde de l'utilisateur en base
    const userData = new Users(user);
    userData.save();

    console.log(`Un nouvel utilisateur ${userData.pseudo} vient de s'inscrire !`);
    let infoUser = `{"lastName" : ${JSON.stringify(userData.lastName)}, "firstName" : ${JSON.stringify(userData.firstName)}, "pseudo" : ${JSON.stringify(userData.pseudo)} }`; // on envoie seulement le nom et le prénom de l'utilisateur


    return res.status(200).json({
        text: "Successfull Authentification",
        token: jwt.encode(userData, config.secret),
        user: infoUser
    });
}

async function login (req, res) {
    const user = {
        email : req.body.email,
        password : req.body.password
    };

    //Cas où un des champs obligatoires est nul
    // if (!user.email || !user.password) {
    //     return res.status(400).json({
    //         text: "Requête invalide"
    //     });
    // }

    // On check si l'utilisateur existe en base
    const findUser = await Users.findOne({ email: user.email });

    if (!findUser)
        return res.status(403).json({
            text: "User not found"
    });

    if (!passwordHash.verify(user.password, findUser.password))
        return res.status(407).json({
            text: "Wrong Password"
    });

    else {
      let infoUser = `{"lastName" : ${JSON.stringify(findUser.lastName)}, "firstName" : ${JSON.stringify(findUser.firstName)}, "pseudo" : ${JSON.stringify(findUser.pseudo)} }`; // on envoie seulement le nom et le prénom de l'utilisateur

      return res.status(200).json({
          text: "Successfull Authentification",
          token: jwt.encode(findUser, config.secret),
          user: infoUser
      });
    }
}

async function checkInfo (req, res) { // teste si le demandeur a déjà donné les infos nécessaires à la constitution du contrat (1ere demande ou non)
  let user = jwt.decode(req.query.user, config.secret);
  let findUser = await Users.findOne({_id : user._id});
  if (findUser) {

     if  ((findUser.gender === undefined) ||
          (findUser.lastName === undefined) ||
          (findUser.firstName === undefined) ||
          (findUser.birthDate === undefined) ||
          (findUser.birthPlace === undefined)) { // test sur tous les champs nécessaires à la constitution d'un contrat
       return res.status(402).json({
           text: "Missing information"
       });
     }

     else { // toutes les infos sont présentes
       return res.status(200).json({
           text: "Success"
       });
     }
  }

  else {
    return res.status(401).json({
        text: "Access token is missing or invalid"
    });
  }
}

async function addInfo (req, res) { // ajoute les infos complémentaires nécessaires au contrat dans la bdd
  let user = jwt.decode(req.body.user, config.secret);
  let findUser = await Users.findOne({_id : user._id});
  if (findUser) {
    await Users.findByIdAndUpdate(user._id, {
    "address": req.body.address, // doute pour adresse : enregistrement du json ou besoin de le faire champ par champ ?
    "gender": req.body.gender,
    "birthDate": req.body.birthDate,
    "birthPlace": req.body.birthPlace
    },
    {useFindAndModify : false},
    function (err) { // màj des infos de l'utilisateur
        if (err) {
            throw err;
        }
    });
     return res.status(200).json({
         text: "Succès"
     });
  }
  else {
    return res.status(400).json({
        text: "Requête invalide"
    });
  }
}

exports.signup = signup;
exports.login = login;
exports.checkInfo = checkInfo;
exports.addInfo = addInfo;
