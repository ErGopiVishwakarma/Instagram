import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../Pages/Home';
import Message from '../Pages/Message';
import Profile from '../Pages/Profile';
import Login from '../Pages/Login';
import Signup from '../Pages/Signup';
import ProtectedRoute from './ProtectedRoute';

const AllRoute = () => {
  return (
    <Routes>
      <Route
        path='/'
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path='/message'
        element={
          <ProtectedRoute>
            <Message />
          </ProtectedRoute>
        }
      />
      <Route
        path='/profile/:id'
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
    </Routes>
  );
};

export default AllRoute;
