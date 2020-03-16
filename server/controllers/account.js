const Users = require("../schema/schemaUsers.js");
const passwordHash = require("password-hash");
const jwt = require("jwt-simple");
const config = require("../config/config");

async function signup (req, res) {
    const user = {
        genre:"", prenom:"", nom:"",
        adresse: {
            numRue:"", 
            rue:"", 
            codePostal:"", 
            ville:"", 
            autre:"",
        },
        tel:"", mailPerso: req.body.mail_perso, dateNaissance:"", villeNaissance:"",
        password: passwordHash.generate(req.body.password)
    };

    //Cas où un des champs obligatoires est nul
    if (user.password === "" || user.mailPerso === "") {
        return res.status(400).json({
            text: "Requête invalide"
        });
    }

    let findUser = await Users.findOne({mailPerso: user.mailPerso});

    console.log(findUser);

    if (findUser) {
        return res.status(400).json({
            text: "L'utilisateur existe déjà"
        });
    }
    
    // Sauvegarde de l'utilisateur en base
    const userData = new Users(user);
    userData.save();
    console.log("Un new !");
    return res.status(200).json({
        text: "Succès",
        token: jwt.encode(userData, config.secret),
        user: userData
    });
}

async function login (req, res) {
    const user = {
        mailPerso: req.body.mail_perso,
        password: req.body.password
    };

    //Cas où un des champs obligatoires est nul
    if (!user.mailPerso || !user.password) {
        return res.status(400).json({
            text: "Requête invalide"
        });
    }

    // On check si l'utilisateur existe en base
    const findUser = await Users.findOne({ mailPerso: user.mailPerso });

    if (!findUser)
        return res.status(401).json({
            text: "L'utilisateur n'existe pas"
    });

    if (!passwordHash.verify(user.password, findUser.password))
        return res.status(401).json({
            text: "Mot de passe incorrect"
    });

    return res.status(200).json({
        text: "Authentification réussie",
        token: jwt.encode(findUser, config.secret),
        user: findUser
    });
}

exports.login = login;
exports.signup = signup;