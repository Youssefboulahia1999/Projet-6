//recuper mongoose
const mongoose = require('mongoose');
//pour avoir un email 
const uniqueValidator = require('mongoose-unique-validator');

//cree un schema
const userSchema = mongoose.Schema({
    //info stocker avec une adresse unique 
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});
//on utilise le plugin
userSchema.plugin(uniqueValidator);

//exporter le model 
module.exports = mongoose.model('User', userSchema);