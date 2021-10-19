//recuper le trajet pour le ficher thing 
const Thing = require('../models/Thing');
//pour que l'image soit suprimer du server
const fs = require('fs');

//exporte la fonction de creation qui va cree l'objet
exports.createThing = (req, res, next) => {
    //route pour cree
    const thingObject = JSON.parse(req.body.thing);
    delete thingObject._id;
    const thing = new Thing({
        ...thingObject,
        //donner l'url de l'image enregistrer 
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    thing.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
        .catch(error => res.status(400).json({ error }));
}

// pour modifier l'objet
exports.modifyThing = (req, res, next) => {
    //si l'objet existe ou si il existe pas 
    const thingObject = req.file ?
        //recuperer le body.parse avec json
        {
            ...JSON.parse(req.body.thing),
            //modifier le corp de l'url
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ...req.body };
    //updateOne pour modifier l'objet avec la meme id+la nouvel modification
    Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet modifié !' }))
        .catch(error => res.status(400).json({ error }));
};

// pour supprimier un objet 
exports.deleteThing = (req, res, next) => {
    //cherche l'image avec sont url
    Thing.findOne({ _id: req.params.id })
        .then(thing => {
            //recuperer le nom de l'image
            const filename = thing.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                //prend id de req et le supprime
                Thing.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
                    .catch(error => res.status(400).json({ error }));
            });
        })
        .catch(error => res.status(500).json({ error }));
};

// recuper un objet
exports.getOneThing = (req, res, next) => {
    //findone pour retrouver UN objet id dans Thing
    Thing.findOne({ _id: req.params.id })
        //thing si il existe 200 non 400
        .then(thing => res.status(200).json(thing))
        .catch(error => res.status(404).json({ error }));
};

// recuper tous les objets
exports.getAllThing = (req, res, next) => {
    //find dans notre modèle Mongoose afin de renvoyer un tableau contenant tous les Things dans notre base de données
    //find pour retrouver les objets
    Thing.find()
        .then(things => res.status(200).json(things))
        .catch(error => res.status(400).json({ error }));
};