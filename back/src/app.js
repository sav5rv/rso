require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const rsoRoutes = require('./routes/rsoRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Conexão com MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB conectado'))
    .catch(err => console.error('Erro ao conectar MongoDB:', err));

// Rotas
app.use('/api/rso', rsoRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});