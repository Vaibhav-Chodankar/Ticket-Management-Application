import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import UserDashboard from './Pages/UserDashboard';
import Login from './Pages/Login';
import Register from './Pages/Register';
import AdminDashboard from './Pages/AdminDashboard';
import MemberDashboard from './Pages/MemberDashboard';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to="/login" />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/user' element={<UserDashboard />} />
          <Route path='/admin' element={<AdminDashboard />} />
          <Route path='/member' element={<MemberDashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
