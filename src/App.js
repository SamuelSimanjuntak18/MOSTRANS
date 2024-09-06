import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CharactersList from './pages/CharactersList';
import DetailCharacter from './pages/DetailCharacter';
import CharacterByLocation from './pages/CharacterByLocation';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CharactersList />} />
        <Route path="/character/:id" element={<DetailCharacter />} />
        <Route path="/location" element={<CharacterByLocation />} />
      </Routes>
    </Router>
  );
}

export default App;
