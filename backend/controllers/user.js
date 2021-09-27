//apres l'installation de bcrypt pour le mdp
const bcrypt = require('bcrypt');

//inportation des token
const jwt = require('jsonwebtoken');

//recuper le user du models
const User = require('../models/user');

//pour enregistrer les nouveau utilisateur
exports.signup = (req, res, next) => {
    // function qui vas hash le mdp 10 son le tour de hashage
    bcrypt.hash(req.body.password, 10)
        //on recuper le mdp
        .then(hash => {
            //cree le nouveau utilisateur dans la base de donnee
            const user = new User({
                email: req.body.email,
                password: hash
            });
            //pour enregistre dans la base de donee 
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};
//pour connecte les utilisateur connectent
exports.login = (req, res, next) => {
    //trouver l'utilisateur qui donne un email
    User.findOne({ email: req.body.email })
        .then(user => {
            //si l'utilisateur du email n'est pas trouver alors 401
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            //si il est trouver alors le mdp sera comparer 
            bcrypt.compare(req.body.password, user.password)
                //si le mdp n'esp pas similer alors 401 mdp pas bon    
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }
                    //si oui alors validation de la connection
                    res.status(200).json({
                        userId: user._id,
                        //creation de token pour les verifier
                        token: jwt.sign(
                            //dans le token il y'auras
                            //l'id de l'utilisateur
                            { userId: user._id },
                            //clef secret
                            'RANDOM_TOKEN_SECRET',
                            //duree du token
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};