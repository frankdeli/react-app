import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Profile from './components/Profile';
import Verify from './components/Verify';
import ResetPassword from './components/ResetPassword';
import RouteGuard from './components/RouteGuard';

const App = () => {
  return (
    <Router>
      <div className="">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify_email" element={<Verify />} />
          <Route path="/home" element={<RouteGuard element={Home} />} />
          <Route path="/profile" element={<RouteGuard element={Profile} />} />
          <Route path="/reset" element={<RouteGuard element={ResetPassword} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;