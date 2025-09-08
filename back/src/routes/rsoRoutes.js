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


// Rota para buscar todos os registros com filtros opcionais
router.get('/buscar', async (req, res) => {
    try {
        // AQUI ESTÁ O CONSOLE.LOG PARA VOCÊ VER OS PARÂMETROS RECEBIDOS
        console.log('Parâmetros de consulta recebidos:', req.query);

        // Cria um objeto de consulta vazio
        const filtro = {};

        // Adiciona os campos de filtro se eles estiverem presentes na URL
        if (req.query.bop) {
            filtro.bop = req.query.bop;
        }
        if (req.query.mes) {
            // Usa $expr para extrair o mês da data e comparar
            // O campo 'data' é uma string no formato 'YYYY-MM-DD'
            // Extrai os caracteres 5 e 6 (o mês) e compara com o filtro
            filtro.$expr = {
                $eq: [{ $substr: ["$data", 5, 2] }, req.query.mes]
            };
        }        
        if (req.query.encEq) {
            // Usa uma expressão regular para uma busca "parcial"
            filtro.encEq = new RegExp(req.query.encEq, 'i');
        }
        if (req.query.hrInicio) {
            filtro.hrInicio = req.query.hrInicio;
        }
        if (req.query.tpSvc) {
            filtro.tpSvc = req.query.tpSvc;
        }

        // AQUI ESTÁ O CONSOLE.LOG PARA VOCÊ VER A CONSULTA QUE O MONGOOSE VAI EXECUTAR
        console.log('Objeto de filtro para o MongoDB:', filtro);

        // Usa o objeto de filtro no método find() do Mongoose
        const rsos = await RSO.find(filtro);
        res.json(rsos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});



// Buscar por ID
router.get('/:id', async (req, res) => {
    const rso = await RSO.findById(req.params.id);
    if (!rso) return res.status(404).json({ error: 'Não encontrado' });
    res.json(rso);
});



// // buscar registros por BOP
// router.get('/bop/:bop', async (req, res) => {
//     try {
//         const bop = req.params.bop;
//         // Usa o método find do Mongoose para filtrar por BOP
//         const rsos = await RSO.find({ bop: bop });
//         res.json(rsos);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });

module.exports = router;