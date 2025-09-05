const express = require('express');
const router = express.Router();
const RSO = require('../models/rso');
const Counter = require('../models/rsoCounter');

// Listar todos
router.get('/', async (req, res) => {
    const rsos = await RSO.find();
    res.json(rsos);
});

// Criar novo
router.post('/', async (req, res) => {
    // Busca e incrementa o contador
    const counter = await Counter.findOneAndUpdate(
        { name: 'numRSO' },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
    );
    req.body.numRSO = counter.seq; // Define o número automático
    const rso = new RSO(req.body);
    await rso.save();
    res.status(201).json(rso);
});

// Buscar por ID
router.get('/:id', async (req, res) => {
    const rso = await RSO.findById(req.params.id);
    if (!rso) return res.status(404).json({ error: 'Não encontrado' });
    res.json(rso);
});

// Atualizar
router.put('/:id', async (req, res) => {
    console.log('PUT req.body:', req.body);
    const rso = await RSO.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(rso);
});

// Excluir
router.delete('/:id', async (req, res) => {
    await RSO.findByIdAndDelete(req.params.id);
    res.json({ message: 'Excluído com sucesso' });
});

module.exports = router;