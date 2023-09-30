const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors'); 

const app = express();
app.use(bodyParser.json());
app.use(cors()); 

let users = [
    { username: 'usuario', password: 'senha' } 
];

let pokemons = [];

// Rota de Login
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    
    if(!username || !password) {
        return res.status(400).send({ error: 'Username e Password são obrigatórios!' });
    }
    
    const user = users.find(user => user.username === username && user.password === password);
    
    if(user) {
        res.send({ success: true });
    } else {
        res.status(401).send({ success: false, error: 'Usuário ou Senha incorretos!' });
    }
});

// Rota de Cadastro de Pokémon
app.post('/pokemon', async (req, res) => {
    try {
        const { pokemonId, customId } = req.body;
        
        if(!pokemonId || !customId) {
            return res.status(400).send({ error: 'PokemonId e CustomId são obrigatórios!' });
        }
        
        const pokemonExists = pokemons.find(p => p.customId === customId);
        if(pokemonExists) {
            return res.status(400).send({ error: 'Este CustomId já está em uso!' });
        }
        
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
        
        const pokemonData = {
            name: response.data.name,
            height: response.data.height,
            weight: response.data.weight,
            customId,
        };
        
        pokemons.push(pokemonData);
        
        res.send(pokemonData);
    } catch (error) {
        res.status(400).send({ error: 'Pokémon não encontrado ou ocorreu um erro ao cadastrá-lo!' });
    }
});

// Rota para Listar Pokémons Cadastrados
app.get('/pokemons', (req, res) => {
    res.send(pokemons);
});

// Inicializando o Servidor
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});