import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import Home from './pages/Landing';
import Post from './pages/Post';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Post" element={<Post />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;