console.log("Iniciando API de Jogos...");
const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

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

    if (categoria) resultado = resultado.filter(p => p.categoria === categoria);
    if (preco_min) resultado = resultado.filter(p => p.preco >= +preco_min);
    if (preco_max) resultado = resultado.filter(p => p.preco <= +preco_max);
    
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

app.post('/api/jogos', (req, res) => {
    const { nome, preco, categoria, ano } = req.body;
     

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

app.put('/api/jogos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const jogoIndex = jogos.findIndex(j => j.id === id);

    if (jogoIndex === -1) {
        return res.status(404).json({ erro: "Jogo não encontrado" });
    }

    const jogo = jogos[jogoIndex];

    let { nome, preco, categoria, ano } = req.body;

    preco = Number(preco);
    ano = Number(ano);

    if (!nome || nome.trim() === "" || !categoria || categoria.trim() === "" || isNaN(preco) || isNaN(ano)) {
        return res.status(400).json({
            erro: "Campos obrigatórios: nome, preco, categoria, ano (preco e ano devem ser números)"
        });
    }

    if (preco <= 0) {
        return res.status(400).json({ erro: "O preço deve ser um número válido maior que 0" });
    }

    if (ano <= 0) {
        return res.status(400).json({ erro: "O ano deve ser um número válido maior que 0" });
    }

    jogo.nome = nome.trim();
    jogo.preco = preco;
    jogo.categoria = categoria.trim();
    jogo.ano = ano;

    res.json({
        mensagem: "Jogo atualizado com sucesso",
        jogo
    });
});

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

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});