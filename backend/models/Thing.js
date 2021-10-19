//c'est le schema que l'utilisateur doit respcte pour que les info soit enregistrer

const mongoose = require('mongoose');

//regle a respecter 
const thingSchema = mongoose.Schema({
 title: { type: String, required: true},
 description: { type: String, required: true},
 imageUrl: { type: String, required: true},
 userId: { type: String, required: true},
 price: { type: Number, required: true},
});

//exporter le model avec le shema a respecter 
module.exports = mongoose.model('Thing', thingSchema);