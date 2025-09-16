const mongoose = require('mongoose');

const movimentCounterSchema = new mongoose.Schema({
    // O '_id' agora é um campo de string que armazena o nome do contador, como 'rsoCounter' ou 'movCounter'.
  _id:  { type: String, default: 'movCounter' },
  name: { type: String, required: true },
  seq:  { type: Number, default: 0 }
}, {
    // Isso impede o Mongoose de tentar criar um ID automático e força a usar o que você fornecer.
    _id: false
  });

module.exports = mongoose.model('movcounter', movimentCounterSchema);