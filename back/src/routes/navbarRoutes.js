// Importa o módulo 'express'
const express = require('express');
// Cria um objeto Router para gerir as rotas
const router = express.Router();
// Importa o módulo 'path' para trabalhar com caminhos de arquivos
const path = require('path');

// ---
// Rotas da barra de navegação
// ---

// Rota para Index
router.get('/', (req, res) => {  
    res.sendFile(path.join(__dirname, '..', '..', 'front', 'index.html'));
});

// Rotas para RSO
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'front', 'index.html'));
});

// Rotas para Movimentação
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'front', 'index.html'));
});

// Rotas para Cadastro
router.get('/cad', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'front', 'cadastro.html'));
});

// Exporta o objeto router para ser usado em outros arquivos
module.exports = router;