const mongoose = require("mongoose");
require("dotenv/config");

const CONNECT_STRING = process.env.CONNECT_STRING;

const connectDB = async () => {
  try {
    await mongoose.connect(CONNECT_STRING);
    console.log("Database Connected");
  } catch (err) {
    console.error("Erreur de connexion à la base de données :", err);
    process.exit(1); // Arrêter le processus en cas d'erreur de connexion
  }
};

module.exports = connectDB;
