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
    res.sendFile(path.join(__dirname, '..', '..', '..', 'front', 'index.html'));
});



// Rotas para RSO
router.get('/rso', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', '..', 'front', 'rso/rso1.html'));
});
router.get('/listar', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', '..', 'front', 'rso/rso.html'));
});
router.get('/consultar', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', '..', 'front', 'rso/consulta-rso.html'));
});
router.get('/resumo1', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', '..', 'front', 'rso/servico-cgp.html'));
});
router.get('/resumo2', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', '..', 'front', 'rso/resumo-cgp.html'));
});



// Rotas para Movimentação
router.get('/patio', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', '..', 'front', 'patio/moviment1.html'));
});
router.get('/movlistar', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', '..', 'front', 'patio/moviment.html'));
});
router.get('/movconsultar', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', '..', 'front', 'patio/consulta-moviment.html'));
});


// Rotas para Alterar Numerador
router.get('/numerador', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', '..', 'front', 'numerador/alterarNum.html'));
});



// Rotas para Cadastro
router.get('/cad', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', '..', 'front', 'pessoas/cadastro.html'));
});



// Exporta o objeto router para ser usado em outros arquivos
module.exports = router;