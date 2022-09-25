import './App.css';
import React from 'react';
import Landing from './Landing';
import Dashboard from './Dashboard';
import BillCreator from './Bill-Creator';
import Login from './Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/createBill" element={<BillCreator />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
