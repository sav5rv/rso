const mongoose = require('mongoose');

const movimentCounterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  seq: { type: Number, default: 0 }
});

module.exports = mongoose.model('moviment_Counter', movimentCounterSchema);