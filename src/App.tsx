import './App.css';
import Canvas from './Components/Canvas/Canvas';
import Header from './Components/Header/Header';
import Title from './Components/Title/Title';
import { getPokemon } from './api';

function App() {
  getPokemon("ditto");
  return (
    <div className="App">
      <Header />
      <Title />
      <Canvas />
    </div>
  );
}

export default App;
