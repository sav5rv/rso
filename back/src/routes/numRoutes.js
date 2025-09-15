const express = require('express');
const router = express.Router();
const RSO = require('../models/rso');
const RSOCounter = require('../models/rsoCounter');
const MOV = require('../models/moviment');
const MOVCounter = require('../models/movimentCounter');

// Rota para buscar o contador de uma coleção
app.get('/num/:collectionName', async (req, res) => {
    try {
        const { collectionName } = req.params;
        const counter = await db.collection('contadores').findOne({ _id: collectionName });
        if (!counter) {
            return res.status(404).json({ message: 'Contador não encontrado.' });
        }
        res.json({ seq: counter.seq });
    } catch (error) {
        res.status(500).json({ message: 'Erro no servidor', error });
    }
});

// Rota para atualizar o contador
app.put('/num/:collectionName', async (req, res) => {
    try {
        const { collectionName } = req.params;
        const { seq } = req.body;
        const result = await db.collection('contadores').updateOne(
            { _id: collectionName },
            { $set: { seq: seq } }
        );
        res.json({ message: 'Contador atualizado com sucesso.', seq });
    } catch (error) {
        res.status(500).json({ message: 'Erro no servidor', error });
    }
});

// Exemplo de uma nova rota no Express (back-end)

// Rota para listar todas as coleções do banco
app.get('/num/collections', async (req, res) => {
    try {
        const collections = await db.listCollections({}, { nameOnly: true }).toArray();
        const collectionNames = collections.map(col => col.name);
        res.json(collectionNames);
    } catch (error) {
        console.error('Erro ao listar coleções:', error);
        res.status(500).json({ message: 'Erro ao listar coleções.' });
    }
});


module.exports = router;