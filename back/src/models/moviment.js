const mongoose = require('mongoose');

const movimentSchema = new mongoose.Schema({
  numReg: { type: Number, default: 0 },
  eventoDER: String,
  atendDER: String,
  numRV: String,
  numBO: String,
  situacao: String,
  marca: String,
  modelo: String,
  placa: String,
  patioDt: String,
  patioLoc: String,
  guinchoPlaca: String,
  guinchoNome: String,
  numMsg: String,
  obs: String

}, { timestamps: true });

module.exports = mongoose.model('MOV', movimentSchema);