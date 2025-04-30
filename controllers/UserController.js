// UserController.js
const User = require("../models/User");
const { registerValidation } = require('../helpers/validators/userValidation'); // Importation des fonctions de validation
const bcrypt = require("bcryptjs");


// Methode retourne utilisateur si existe
exports.findUserById = async function (req, res) {
    const userId = req.params.id; // Récupérer l'ID à partir des paramètres de la requête
    
    try {
        const user = await User.findById(userId); // Rechercher l'utilisateur par son ID dans la base de données
        
        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }

        return res.status(200).json(user); // Renvoyer l'utilisateur trouvé
    } catch (error) {
        console.error("Erreur lors de la recherche de l'utilisateur :");
        return res.status(500).json({ message: "Erreur serveur lors de la recherche de l'utilisateur" });
    }
};

// Méthode pour ajouter un utilisateur
exports.addUser = async function (req, res) {
    // Validation des données reçues
    const { error } = registerValidation(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const file = req.file;
    if (!file) return res.status(400).send('No image in the request'); 
    const fileName = file.filename;
    const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;
    const { username, email, password,isAdmin } = req.body;
  
    try {
      // Vérification si l'utilisateur existe déjà avec le même email ou nom d'utilisateur
      const existingUser = await User.findOne({ $or: [{ email }, { username: username }] });
      if (existingUser) {
        return res.status(400).json({ message: 'Cet utilisateur existe déjà.' });
      }
  
      // Création d'un nouvel utilisateur
      const newUser = new User({
        username,
        email,
        passwordHash: bcrypt.hashSync(password, 10),
        isAdmin,
        imageURL :`${basePath}${fileName}`
        // Autres champs de l'utilisateur
      });
  
      // Enregistrement de l'utilisateur dans la base de données
      const savedUser = await newUser.save();
      res.status(201).json(savedUser); // Renvoie l'utilisateur créé en tant que réponse
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'utilisateur :', error);
      res.status(500).json({ message: 'Erreur lors de l\'ajout de l\'utilisateur' });
    }
};
 
exports.deleteUser = async function (req, res) {
    const userId = req.params.id; // Récupérer l'ID de l'utilisateur à supprimer
  
    try {
      const deletedUser = await User.findByIdAndDelete(userId);
      if (!deletedUser) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
      }
  
      res.status(200).json({ message: 'Utilisateur supprimé avec succès', deletedUser });
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'utilisateur :', error);
      res.status(500).json({ message: 'Erreur lors de la suppression de l\'utilisateur' });
    }
  };