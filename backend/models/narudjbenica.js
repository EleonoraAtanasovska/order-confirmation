const mongoose = require('mongoose');

const narudjbenicaSchema = mongoose.Schema({
  _id: false,
  idNarudjbenice: {type: Number, required: true, unique: true, index:true},
  datumKreiranja: {type:Date},
  status: {type: String, required: true},
  datumPotvrde: {type:Date}
});

module.exports = mongoose.model('Narudjbenica', narudjbenicaSchema);

