# API de Jogos - Trabalho 1 API REST
### Ana Beatriz Esteves da Silva

    - API REST desenvolvida com Node.js, Express e JavaScript para o gerenciamento de jogos.
    - Permite realizar operações de CRUD (Criar, Ler, Atualizar e Deletar) e possui funcionalidades de filtro, ordenação e paginação.
    - URL: http://localhost:3000/api/jogos

## Endpoints:

### GET /
    URL: http://localhost:3000/
    - Verifica se a API está funcionando.
    Resposta:
    {
        "mensagem": "API de Jogos funcionando!",
        "status": "sucesso",
        "timestamp": "2026-03-23T00:00.000Z"
    }

### GET /info
    URL: http://localhost:3000/info
    - Retorna informações sobre a API.
    Resposta:
    {
        "nome": "API de Jogos - Trabalho 1 de API REST",
        "versao": "1.0.0",
        "autor": "Ana Beatriz"
    }

### GET /api/jogos
    URL: http://localhost:3000/api/jogos
    - Lista todos os jogos com filtros, ordenação e paginação.
    - Exemplo: /api/jogos?categoria=Ação&preco_max=100&ordem=preco&direcao=asc
    Resposta:
    {
        "dados": [
            {
                "id": 2,
                "nome": "Hollow Knight",
                "preco": 50,
                "categoria": "Ação",
                "ano": 2017
            },
            {
                "id": 6,
                "nome": "Overcooked 2",
                "preco": 60,
                "categoria": "Ação",
                "ano": 2018
            },
            {
                "id": 3,
                "nome": "Cult of the Lamb",
                "preco": 65,
                "categoria": "Ação",
                "ano": 2020
            }
        ],
        "paginacao": {
            "pagina_atual": 1,
            "itens_por_pagina": 10,
            "total_itens": 3,
            "total_paginas": 1
        }
    }

### GET /api/jogos/:id
    URL: http://localhost:3000/api/jogos/1
    - Busca um jogo por ID.
    Resposta:
    {
        "id": 1,
        "nome": "Resident Evil Requiem",
        "preco": 300,
        "categoria": "Terror",
        "ano": 2026
    }

### POST /api/jogos
    URL: http://localhost:3000/api/jogos/
    - Cria um novo jogo.
    Body:
    {
        "nome": "Novo Jogo",
        "preco": 100,
        "categoria": "Terror",
        "ano": 2025
    }
    Resposta:
    {
       "id": 7,
       "nome": "Novo Jogo",
       "preco": 100,
       "categoria": "Terror",
       "ano": 2025 
    }

### PUT /api/jogos/:id
    URL: http://localhost:3000/api/jogos/1
    - Atualiza os dados de um jogo.
    Body:
    {
        "nome": "Jogo atualizado",
        "preco": 120,
        "categoria": "RPG",
        "ano": 2025
    }
    Resposta:
    {
        "id": 1,
        "nome": "Jogo atualizado",
        "preco": 120,
        "categoria": "RPG",
        "ano": 2025
    }

### DELETE /api/jogos/:id
    URL: http://localhost:3000/api/jogos/1
    - Remove um jogo pelo id.
    Resposta:
    204 No Content

## Validações Implementadas:

    - Os campos 'nome', 'preço', 'categoria' e 'ano' são obrigatórios.
    - O campo 'nome' não pode ser vazio ou apenas espaços.
    - Os campos 'preco' e 'ano' devem ser números positivos.
    - Filtros válidos: 'categoria', 'preco_min' e 'preco_max'.
    - A ordenação pode ser feita por 'nome' ou 'preco'.


    - Preço deve ser um número e positivo.
    - Nome não pode ser vazio.
    - Ano não pode ser 0.

## Testes Postman:

### GET /
![teste.get/](<GET .-1.png>)

### GET /info
![teste.get/info](info-1.png)

### GET /api/jogos
![teste.get-api/jogos](<GET api.jogos.png>)

### GET api/jogos/:id
![teste.get-api/jogos/id](<GET api.jogos.id.png>)

### POST api/jogos
![teste.post1](<POST api.jogos.png>)
![teste.post2](<post 2.png>)
![teste.post3](<post 3.png>)
![teste.post4](<post 4.png>)
![teste.post5](<post 5.png>)

### DELETE
![teste.delete](<Captura de tela 2026-03-23 205026.png>)