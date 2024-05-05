import React, { ChangeEvent, FormEvent } from 'react';
import './App.css';
import Canvas from './Components/Canvas/Canvas';
import Header from './Components/Header/Header';
import Title from './Components/Title/Title';
import { getPokemon } from './api';

function App() {

  const [search, setSearch] = React.useState('');
  const [pokemon, setPokemon] = React.useState<string>('');

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearch(e.target.value);
  }

  const handleSearchSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const pokemon = await getPokemon(search);
    console.log(pokemon);
  }

  return (
    <div className="App">
      <Header onSearchChange={handleSearchChange} onSearchSubmit={handleSearchSubmit} />
      <Title />
      <Canvas />
    </div>
  );
}

export default App;
