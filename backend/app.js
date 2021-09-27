const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');

// inporter le router qui dans le fichier stuff
const stuffRoutes = require('./routes/stuff');

// inporter le user route du ficher user
const userRoutes = require('./routes/user');

mongoose.connect('mongodb+srv://pascal:<password>@youssef.ck0ts.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(body - Parser.json());

app.use('/api/stuff', stuffRoutes);
//enregistre les route
app.use('/api/auth', userRoutes);

module.exports = app;
