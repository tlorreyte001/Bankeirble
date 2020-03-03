const Users = require("../schema/schemaUsers.js");
const passwordHash = require("password-hash");

async function signup (req, res) {
    const { gender, first_name, last_name, password, num, street, zip, city, comp, tel, mail_perso, birth_date, birth_city } = req.body;
    
    //Cas où un des champs obligatoires est nul
    if (!password || !mail_perso) {
        return res.status(400).json({
            text: "Requête invalide"
        });
    }

    // Objet User, où on hash son password
    const user = {
        gender, first_name, last_name, password, num, street, zip, city, comp, tel, mail_perso, birth_date, birth_city,
        password: passwordHash.generate(password)
    };

    // Check s'il existe déja, pour eviter les doublons
    const findUser = await Users.findOne({
        mail_perso
    });

    if (findUser) {
        return res.status(400).json({
            text: "L'utilisateur existe déjà"
        });
    }
    
    // Sauvegarde de l'utilisateur en base
    const userData = new Users(user);
    await userData.save();
    return res.status(200).json({
        text: "Succès",
    });
}

async function login (req, res) {
    const { password, mail_perso } = req.body;

    //Cas où un des champs obligatoires est nul
    if (!mail_perso || !password) {
        return res.status(400).json({
            text: "Requête invalide"
        });
    }

    // On check si l'utilisateur existe en base
    const findUser = Users.findOne({ mail_perso });

    if (!findUser)
        return res.status(401).json({
            text: "L'utilisateur n'existe pas"
    });

    if (passwordHash.generate(password) != findUser.password)
        return res.status(401).json({
            text: "Mot de passe incorrect"
    });

    return res.status(200).json({
        text: "Authentification réussi"
    });
}

exports.login = login;
exports.signup = signup;