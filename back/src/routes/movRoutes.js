const express = require('express');
const router = express.Router();
const MOV = require('../models/moviment');
const COUNTER = require('../models/movCounter');



// Listar todos os registros
router.get('/', async (req, res) => {
    try {
        const movs = await MOV.find();
        res.json(movs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});



// Criar novo
router.post('/', async (req, res) => {
    // Busca e incrementa o contador
    const counter = await COUNTER.findOneAndUpdate(
        { name: 'numReg' },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
    );
    req.body.numReg = counter.seq; // Define o número automático
    const mov = new MOV(req.body);
    await mov.save();
    res.status(201).json(mov);
});



// Atualizar
router.put('/:id', async (req, res) => {
    console.log('PUT req.body:', req.body);
    const mov = await MOV.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(mov);
});



// Excluir
router.delete('/:id', async (req, res) => {
    await MOV.findByIdAndDelete(req.params.id);
    res.json({ message: 'Excluído com sucesso' });
});



// Rota para buscar todos os registros com filtros opcionais
router.get('/buscar', async (req, res) => {
    try {
        // AQUI ESTÁ O CONSOLE.LOG PARA VOCÊ VER OS PARÂMETROS RECEBIDOS
        console.log('Parâmetros de consulta recebidos:', req.query);

        // Cria um objeto de consulta vazio
        const filtro = {};

        // Adiciona os campos de filtro se eles estiverem presentes na URL
        if (req.query.placa) {
            filtro.placa = req.query.placa;
        }
        if (req.query.mes) {
            // Usa $expr para extrair o mês da data e comparar
            // O campo 'data' é uma string no formato 'YYYY-MM-DD'
            // Extrai os caracteres 5 e 6 (o mês) e compara com o filtro
            filtro.$expr = {
                $eq: [{ $substr: ["$patioDt", 5, 2] }, req.query.mes]
            };
        }        


        // AQUI ESTÁ O CONSOLE.LOG PARA VOCÊ VER A CONSULTA QUE O MONGOOSE VAI EXECUTAR
        console.log('Objeto de filtro para o MongoDB:', filtro);

        // Usa o objeto de filtro no método find() do Mongoose
        const movs = await MOV.find(filtro).sort({ numReg: 'desc' });
        res.json(movs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});



// Buscar por ID
router.get('/:id', async (req, res) => {
    const mov = await MOV.findById(req.params.id);
    if (!mov) return res.status(404).json({ error: 'Não encontrado' });
    res.json(mov);
});

module.exports = router;