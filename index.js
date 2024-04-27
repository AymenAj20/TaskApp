const express = require("express");
const app = express();
const connectDB = require("./DB/dbConnect"); 
const cors = require("cors");
const morgan = require("morgan");


//Fichier envirennement
require("dotenv/config");

const SERVER_PORT = process.env.SERVER_PORT || 8000;
const SERVER_HOST = process.env.SERVER_HOST;

const API = process.env.API_URL;


// avoir la possibiliter de traiter le contenue JSON de requette
app.use(express.json());

//Autoriser au front d'acceder au NodeJS
app.use(cors());
app.options("*", cors);
// Affichage au console de chaque requette
app.use(morgan("tiny"));
//Declarer le dossier comme static folder pour stocker les images
app.use('/public', express.static('public'));

// Les routes
const authRouter = require("./Routes/AuthRouter");
const userRouter = require("./Routes/UserRouter");
const taskRouter = require("./Routes/TaskRouter");

const authController = require('./authentication/AuthController')

app.get('/',(req,res) => {
  res.send("Server Started on port :"+SERVER_PORT);
})
// APIs
app.use(`${API}/auth`, authRouter);
app.use(`${API}/user`, userRouter);
app.use(`${API}/task`, taskRouter);

// Connexion au serveur NodeJS
app.listen(SERVER_PORT, () => {
  console.log("Server Started on port :"+SERVER_PORT);
});

//Connexion sur la base de données
connectDB(); // Appel de la fonction de connexion à la base de données

module.exports = app;
