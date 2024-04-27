const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const createToken = require("./jwt");

const User = require("../models/User");

const secretKey = process.env.SECRET_KEY

// Methode de vérification du token d'authentification
exports.verifyToken = (req, res, next) => {
  // Récupérer le token d'authentification dans le header de la requête
  const token = req.headers["authorization"];
  if (!token) {
    // Si le token n'existe pas, renvoyer une erreur 401 (non autorisé)
    return res.status(401).send("Token non valide.");
  }

  try {
    // Vérifier le token avec la clé secrète 
    let decoded;
    for (let role of req.roles) {
      try {
        decoded = jwt.verify(token);
        break;
      } catch (err) {
        continue;
      }
    }

    req.user = decoded;
    console.log(req.user);
    next();
  } catch (err) {
    // Si une erreur survient, renvoyer une erreur 500 (erreur interne du serveur)
    res.status(500).send("Erreur interne du serveur.");
  }
};

exports.login = async function (req, res) {
  try {
    const user = await User.findOne({  username: req.body.username });
    if (!user) {
      return res.status(400).send("Utilisateur n'existe pas");
    }

    // Supprimer la propriété passwordHash de l'objet utilisateur
    const { passwordHash, ...userWithoutPassword } = user.toJSON();

    if (bcrypt.compareSync(req.body.password, user.passwordHash)) {
      const token = createToken(
        {
          userID: user.id,
          email: user.email,
        },
        secretKey
      );

      res.status(200).send({
        message: "User Authenticated",
        user: userWithoutPassword, // Utilisateur sans le mot de passe
        token: token,
      });
    } else {
      res.status(400).send("Mot de passe incorrect.");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Error au serveur" });
  }
};

