import React, { ChangeEvent, FormEvent } from 'react';
import './App.css';
import Canvas from './Components/Canvas/Canvas';
import Header from './Components/Header/Header';
import Title from './Components/Title/Title';
import { getPokemon } from './api';
import { Pokemon } from './pokemon';

function App() {

  const [search, setSearch] = React.useState('');
  const [pokemon, setPokemon] = React.useState<Pokemon>({ name: 'Pokémon', sprite: 'n/a' });

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearch(e.target.value.toLowerCase());
  }

  const handleSearchSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const pokemon = await getPokemon(search);
    if (pokemon) {
      setPokemon(pokemon);
    }
  }

  return (
    <div className="App">
      <Header onSearchChange={handleSearchChange} onSearchSubmit={handleSearchSubmit} />
      <Title pokemon_name={pokemon.name} />
      <Canvas />
    </div>
  );
}

export default App;
