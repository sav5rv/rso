const express = require('express');
const router = express.Router();
const RSO = require('../models/rso');

// Listar todos
router.get('/', async (req, res) => {
    const rsos = await RSO.find();
    res.json(rsos);
});

// Criar novo
router.post('/', async (req, res) => {
    console.log(req.body); // Veja o que está chegando do frontend
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
    const rso = await RSO.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(rso);
});

// Excluir
router.delete('/:id', async (req, res) => {
    await RSO.findByIdAndDelete(req.params.id);
    res.json({ message: 'Excluído com sucesso' });
});

module.exports = router;