// numRoutes.js
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// **2. Rota para buscar o contador 
router.get('/:collectionName', async (req, res) => {
    try {
        const db = mongoose.connection.db;
        const { collectionName } = req.params;

        let counterId;
        if (collectionName === 'rsocounters') {
            counterId = 'rsoCounter';
        } else if (collectionName === 'movcounters') {
            counterId = 'movCounter';
        } else {
            return res.status(404).json({ message: 'Contador não mapeado.' });
        }

        const counter = await db.collection(collectionName).findOne({ _id: counterId });
        if (!counter) {
            return res.status(404).json({ message: 'Contador não encontrado.' });
        }
        res.json({ seq: counter.seq });
    } catch (error) {
        res.status(500).json({ message: 'Erro no servidor', error });
    }
});

// **3. Rota para atualizar o contador**
router.put('/:collectionName', async (req, res) => {
    try {
        const db = mongoose.connection.db;
        const { collectionName } = req.params;
        const { seq } = req.body;

        // **Ajuste aqui:** mapeia o nome da coleção para o _id do contador
        let counterId;
        if (collectionName === 'rsocounters') {
            counterId = 'rsoCounter';
        } else if (collectionName === 'movcounters') {
            counterId = 'movCounter';
        } else {
            return res.status(404).json({ message: 'Contador não mapeado.' });
        }
        
        const result = await db.collection(collectionName).updateOne(
            { _id: counterId },
            { $set: { seq: seq } }
        );
        res.json({ message: 'Contador atualizado com sucesso.', seq });
    } catch (error) {
        res.status(500).json({ message: 'Erro no servidor', error });
    }
});

module.exports = router;