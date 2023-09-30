import React, { useState } from 'react';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [pokemonId, setPokemonId] = useState('');
  const [customId, setCustomId] = useState('');
  const [pokemons, setPokemons] = useState([]);

  const login = async () => {
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();
      if (data.success) setLoggedIn(true);
      else alert('Usuário ou senha incorretos');
    } catch (error) {
      console.error('Erro ao realizar login', error);
    }
  };

  const cadastrarPokemon = async () => {
    try {
      const response = await fetch('http://localhost:3000/pokemon', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pokemonId, customId })
      });
      const data = await response.json();
      setPokemons(prev => [...prev, data]);
    } catch (error) {
      console.error('Erro ao cadastrar Pokémon', error);
    }
  };

  return (
    <div className="App">
      {!isLoggedIn ? (
        <div id="login-form">
          <label>
            Usuário: <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </label>
          <label>
            Senha: <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <button onClick={login}>Login</button>
        </div>
      ) : (
        <div id="pokemon-form">
          <label>
            Pokémon ID: <input type="number" value={pokemonId} onChange={(e) => setPokemonId(e.target.value)} />
          </label>
          <label>
            Custom ID: <input type="text" value={customId} onChange={(e) => setCustomId(e.target.value)} />
          </label>
          <button onClick={cadastrarPokemon}>Cadastrar</button>
        </div>
      )}
      {pokemons.length > 0 && (
        <table id="pokemon-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Height</th>
              <th>Weight</th>
              <th>Custom ID</th>
            </tr>
          </thead>
          <tbody id="pokemon-tbody">
            {pokemons.map((pokemon, index) => (
              <tr key={index}>
                <td>{pokemon.name}</td>
                <td>{pokemon.height}</td>
                <td>{pokemon.weight}</td>
                <td>{pokemon.customId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;