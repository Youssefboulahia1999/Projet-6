//inportation d'express
const express = require("express");
//inportantion de bodyparser pour transformer les requte post en json
const bodyParser = require('body-parser');
// const app pour cree une application express
const app = express();
//inporter mongoose
const mongoose = require('mongoose');
// donne acces au chemin du dossier image
const path = require('path');

// inporter le router qui dans le fichier stuff
const stuffRoutes = require('./routes/stuff');

// inporter le user route du ficher user
const userRoutes = require('./routes/user');

//ta base de donnee
mongoose.connect('mongodb+srv://pascal:<password>@youssef.ck0ts.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

//function de l'app qui va traite les requete et les reponse pour aller a l'api
app.use((req, res, next) => {
//tous le monde aura le droit d'accesde a l'api
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  //pour que l'app laisse les gens d'utillise get post ... de l'api
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
//next va revoyer la reponse de la fonction 
  next();
});

//transformer la requete post en json
app.use(bodyParser.json());

//donner la route de l'image l'image 
app.use('/images', express.static(path.join(__dirname, 'images')));

//route pour que l'app va recuperer le contenu de l'api
app.use('/api/stuff', stuffRoutes);
//enregistre les route
app.use('/api/auth', userRoutes);

//exporte l'application pour y acceder pour les autre fichier 
module.exports = app;
