import React, { ChangeEvent } from 'react';
import './App.css';
import Canvas from './Components/Canvas/Canvas';
import Header from './Components/Header/Header';
import Title from './Components/Title/Title';
import { getPokemon } from './api';

function App() {

  const [search, setSearch] = React.useState('');

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    console.log(e.target.value);
  }

  return (
    <div className="App">
      <Header onSearchChange={handleSearchChange} />
      <Title />
      <Canvas />
    </div>
  );
}

export default App;
