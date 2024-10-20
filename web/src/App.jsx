import { useState } from "react";
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/Signup';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<SignUp />} /> {/* Sign-up is default */}
      <Route path="/login" element={<Login />} />
        <Route path="/customer-dashboard" element={<Home />} />
        {/* Add other routes for restaurant and deliverer */}
      </Routes>
    </Router>
  );
}

export default App;

