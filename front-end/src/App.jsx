import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import Home from './pages/Landing';
import Post from './pages/Post';
import PostListing from './pages/PostListings';
import RegisterPage from './pages/Register';
import LoginPage from './pages/Login';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Post" element={<Post />} />
          {/* <Route path="/Post/:id" element={<Post />} /> */}
          <Route path="/listing" element={<PostListing />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
