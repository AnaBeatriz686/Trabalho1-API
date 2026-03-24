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

## Testes Postman:

### GET /
<img width="1441" height="394" alt="GET " src="https://github.com/user-attachments/assets/81818cdb-5a4d-4b27-a077-bcce41db6ba3" />

### GET /info
<img width="1435" height="363" alt="info" src="https://github.com/user-attachments/assets/efb24aa0-abfd-4f84-a409-8f85ba690bd5" />

### GET /api/jogos
<img width="1439" height="938" alt="GET api jogos" src="https://github.com/user-attachments/assets/c362980f-537f-4e78-aaac-97f0847af226" />

### GET api/jogos/:id
<img width="1435" height="387" alt="GET api jogos id" src="https://github.com/user-attachments/assets/50fda659-84cb-4d5d-96f9-9f656bcb157e" />

### POST api/jogos
<img width="1434" height="685" alt="POST api jogos" src="https://github.com/user-attachments/assets/f0554a0e-3c93-4954-9b50-adbc149fa454" />
<img width="1440" height="635" alt="post 2" src="https://github.com/user-attachments/assets/e7efed69-4b76-458a-9dda-9322e4b15598" />
<img width="1429" height="661" alt="post 3" src="https://github.com/user-attachments/assets/d5b792e4-89ee-4a3d-b3af-4b917c5fbf08" />
<img width="1430" height="652" alt="post 4" src="https://github.com/user-attachments/assets/17fc6318-f11c-40ac-b152-e469271c9e0a" />
<img width="1441" height="648" alt="post 5" src="https://github.com/user-attachments/assets/11648f98-a219-41b6-bef5-6c6c603c6918" />

<img width="1441" height="932" alt="post erro nome" src="https://github.com/user-attachments/assets/132dcb6b-93f6-4733-88a0-5780bbbf8351" />
<img width="1440" height="543" alt="post erro preco" src="https://github.com/user-attachments/assets/f15c2e91-bda7-41a9-b9bb-3e5c3a1e62f8" />

### DELETE
<img width="1442" height="328" alt="Captura de tela 2026-03-23 205026" src="https://github.com/user-attachments/assets/20fffb89-acbb-4d5a-86fc-b85d4b522652" />
