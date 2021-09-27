const express = require('express');
//cree un router avec la methode
const router = express.Router();


//recuper le ficher qui controle les action
const stuffCtrl = require('../controllers/stuff');
//inporter le middleware qui vont proteger l'equipement
const auth = require('../middleware/auth');

//utilisation de la fonction qui se trouve dans le controller
router.post('/',auth,stuffCtrl.creatThings);
//put pour modifier ou suprimer
router.put('/:id',auth,stuffCtrl.modifyThing);
//delete pour suprimer avec l'id choisi
router.delete('/:id',auth,stuffCtrl.modifyThing);
//pour repondre au get pour avoir acces avec son id  
router.get('/:id',auth,stuffCtrl.getOneThing);
router.get('/',auth,stuffCtrl.getAllThings);

//maintemain qu'il est la on vas exporter le router dans un autre fichie

module.experts = router;