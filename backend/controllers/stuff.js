//recuper le trajet pour le ficher thing 
const Thing = require('../models/Thing')

//exporte la fonction de creation 
exports.createThing = (req, res, next) => {
    delete req.body._id;
    const thing = new Thing({
        ...req.body
    });
    thing.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
        .catch(error => res.status(400).json({ error }));
}

// pour modifier l'objet
exports.modifyThing = (req, res, next) => {
    //updateOne pour modifier l'objet avec la meme id+la nouvel modification
    Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet modifié !' }))
        .catch(error => res.status(400).json({ error }));
};

// pour supprimier un objet 
exports.deleteThing = (req, res, next) => {
    //prend id de red et le supprime
    Thing.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
        .catch(error => res.status(400).json({ error }));
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