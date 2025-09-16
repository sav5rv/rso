require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');

const rsoRoutes = require('./src/routes/rsoRoutes');
const movRoutes = require('./src/routes/movRoutes');
const numRoutes = require('./src/routes/numRoutes');

const app = express();
app.use(express.json());
app.use(cors());

// Middleware para servir arquivos estáticos
app.use(express.static(path.join(__dirname, '..', 'front')));

// Conexão com MongoDB
const mongoUser = process.env.MONGO_USER;
const mongoPass = process.env.MONGO_PASS;
const mongoHost = process.env.MONGO_HOST;
const mongoDb   = process.env.MONGO_DB;

const MONGO_URI = `mongodb+srv://${mongoUser}:${mongoPass}@${mongoHost}/${mongoDb}`;

mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB conectado'))
    .catch(err => console.error('Erro ao conectar MongoDB:', err));



// Rotas
app.use('/api/rso', rsoRoutes);
app.use('/api/mov', movRoutes);
app.use('/api/num', numRoutes);

// Rota principal para servir a página index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'front', 'index.html'));
});

// Iniciar o servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});