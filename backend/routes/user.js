const express = require('express');
//cree le router
const router = express.Router();

//le controleur pour associer les fonction aux route
const userCtrl = require('../controllers/user');

//cree deux route post pour que le front envoie l'adresse email et le mdp
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
//exporter le router
module.exports = router;