import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import Home from './pages/Landing';
import Post from './pages/Post';
import PostListing from './pages/PostListings';
import RegisterPage from './pages/Register';
import LoginPage from './pages/Login';
import PotsPage from './pages/Pots';
import AddListing from './pages/AddListing';
import MatchingsPage from './pages/Matchings';

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
          <Route path="/Pots" element={<PotsPage />} />
          <Route path="/add-listing" element={<AddListing />} />
          <Route path="/matchings" element={<MatchingsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
