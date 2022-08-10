import './App.css';
import React from 'react';
import Landing from './Landing';
import Dashboard from './Dashboard';
import BillCreator from './Bill-Creator';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/createBill" element={<BillCreator />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
