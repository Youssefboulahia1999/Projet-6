// inporte multer pour permetre au utilisateur de charger un phote de l'objet a vendre 

//ses fonction vont gerer les ficher 
const multer = require('multer');

//dictionaire pour dire quelle mine type en peut avoi
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};
//disk pour enregistrer sur le disque 
const storage = multer.diskStorage({
//function dans la quelle elle vas donner une destination pour enregistrer les fichier
  destination: (req, file, callback) => {
      //nomde la destination
    callback(null, 'images');
  },
  //qui va donner un nom au ficher 
  filename: (req, file, callback) => {
      //nom d'origine avec des ''
    const name = file.originalname.split(' ').join('_');
    //cree les extension des fichier 
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});
//exporter le middleware
module.exports = multer({storage: storage}).single('image');