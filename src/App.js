import React, {useState } from 'react';
import MainForm from './components/main/mainForm';
import Game from './components/game/main.js';
import './App.css';

function App() {

  const [isFound, setIsFound] = useState({});
  return (
    <div className="App">
      {!isFound ? <MainForm  setIsFound={setIsFound}/> : <Game />}
    </div>
  );
}

export default App;
