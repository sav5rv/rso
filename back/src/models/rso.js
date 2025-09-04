const mongoose = require('mongoose');

const rsoSchema = new mongoose.Schema({
  numRSO: String,
  data: String,
  numPPRi: String,
  encEq: String,
  vtr: String,
  bop: String,
  tpSvc: String,
  aux1: String,
  aux2: String,
  aux3: String,
  hrInicio: String,
  qtdFisc: String,
  qtdAut: String,
  qtBO: String,
  qtARV: String,
  qtdARD: String,
  qtdImg: String,
  qtdTestes: String
}, { timestamps: true });

module.exports = mongoose.model('RSO', rsoSchema);