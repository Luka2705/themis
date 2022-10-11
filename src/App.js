import './App.css';
import React from 'react';
import Landing from './Landing';
import Dashboard from './Dashboard';
import BillCreator from './Bill-Creator';
import Login from './Authentication/Login';
import SignIn from './Authentication/Sign-In';
import Account from './Account';
import History from './History';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/createBill" element={<BillCreator />}></Route>
        <Route path="/signIn" element={<SignIn />}></Route>
        <Route path="/account" element={<Account />}></Route>
        <Route path="/history" element={<History />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
