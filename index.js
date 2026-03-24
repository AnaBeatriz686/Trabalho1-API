console.log("Iniciando API de Jogos...");
const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// Dados em memória (simulando um banco de dados).
let jogos = [
    { id: 1, nome: "Resident Evil Requiem", preco: 300, categoria: "Terror", ano: 2026 },
    { id: 2, nome: "Hollow Knight", preco: 50, categoria: "Ação", ano: 2017 },
    { id: 3, nome: "Cult of the Lamb", preco: 65, categoria: "Ação", ano: 2020 },
    { id: 4, nome: "Elden Ring", preco: 275, categoria: "RPG", ano: 2022 },
    { id: 5, nome: "Stardew Valley", preco: 25, categoria: "RPG", ano: 2016 },
    { id: 6, nome: "Overcooked 2", preco: 60, categoria: "Ação", ano: 2018 }
];

let proximoId = jogos.length + 1;

app.get('/', (req, res) => {
    res.json({
        mensagem: 'API de Jogos funcionando!',
        status: 'sucesso',
        timestamp: new Date().toISOString()
    });
});

app.get('/info', (req, res) => {
    res.json({
        nome: 'API de Jogos - Trabalho 1 de API REST',
        versao: '1.0.0',
        autor: 'Ana Beatriz'
    });
});

// GET /api/jogos
// filtros + ordenação + paginação
app.get('/api/jogos', (req, res) => {
    const {
        categoria,
        preco_min,
        preco_max,
        ordem,
        direcao,
        pagina = 1,
        limite = 10
    } = req.query;

    let resultado = [...jogos];

    // Filtros
    if (categoria) resultado = resultado.filter(p => p.categoria === categoria);
    if (preco_min) resultado = resultado.filter(p => p.preco >= +preco_min);
    if (preco_max) resultado = resultado.filter(p => p.preco <= +preco_max);

    // Ordenação
    
    if (ordem === 'preco') {
        resultado.sort((a, b) =>
            direcao === 'desc' ? b.preco - a.preco : a.preco - b.preco
        );
    }
    if (ordem === 'nome') {
        resultado.sort((a, b) =>
            direcao === 'desc'
                ? b.nome.localeCompare(a.nome)
                : a.nome.localeCompare(b.nome)
        );
    }

    // Paginação
    const paginaNum = parseInt(pagina);
    const limiteNum = parseInt(limite);

    const inicio = (paginaNum - 1) * limiteNum;
    const dados = resultado.slice(inicio, inicio + limiteNum);

    res.json({
        dados,
        paginacao: {
            pagina_atual: paginaNum,
            itens_por_pagina: limiteNum,
            total_itens: resultado.length,
            total_paginas: Math.ceil(resultado.length / limiteNum)
        }
    });
});


// GET por ID
app.get('/api/jogos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const jogo = jogos.find(p => p.id === id);

    if (!jogo) {
        return res.status(404).json({
            erro: "Jogo não encontrado"
        });
    }

    res.json(jogo);
});

// POST - criar novo jogo
app.post('/api/jogos', (req, res) => {
    const { nome, preco, categoria, ano } = req.body;

    // Validações
     

    if (!nome || nome.trim() === "" || preco === undefined || !categoria || ano === undefined) {
        return res.status(400).json({
            erro: "Campos obrigatórios: nome, preco, categoria, ano"
        });
    }

    if (typeof preco !== 'number' || preco <= 0) {
        return res.status(400).json({
            erro: "Preço deve ser um número positivo"
        });
    }

    if (typeof ano !== 'number' || ano <= 0) {
        return res.status(400).json({
            erro: "Ano deve ser um número maior que zero"
        });
    }

    const novoJogo = {
        id: proximoId++,
        nome: nome.trim(),
        preco: Number(preco),
        categoria: categoria.trim(),
        ano: Number(ano)
    };

    jogos.push(novoJogo);
    
    res.status(201).json(novoJogo);
});

// PUT - atualizar jogo
// PUT - Atualizar jogo (Versão Corrigida)
app.put('/api/jogos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = jogos.findIndex(j => j.id === id);

    if (index === -1) {
        return res.status(404).json({ erro: "Jogo não encontrado" });
    }

    // EXTRAINDO OS DADOS DO CORPO DA REQUISIÇÃO
    const { nome, preco, categoria, ano } = req.body;

    // ATUALIZANDO DIRETAMENTE NO ARRAY PARA EVITAR ERRO DE VARIÁVEL
    if (nome) jogos[index].nome = nome;
    if (preco) jogos[index].preco = Number(preco);
    if (categoria) jogos[index].categoria = categoria;
    if (ano) jogos[index].ano = Number(ano);

    res.json({
        mensagem: "Jogo atualizado com sucesso",
        jogo: jogos[index]
    });
});

// DELETE
app.delete('/api/jogos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = jogos.findIndex(p => p.id === id);

    if (index === -1) {
        return res.status(404).json({
            erro: "Jogo não encontrado"
        });
    }

    jogos.splice(index, 1);

    res.status(204).send();
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});