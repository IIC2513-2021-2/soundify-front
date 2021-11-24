import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './views/Home';
import ArtistList from './views/ArtistList';
import ArtistDetail from './views/ArtistDetail';
import NotFound from './views/NotFound';
import Register from './views/Register';
import Login from './views/Login';
import AuthContextProvider from './contexts/AuthContext';
import Navbar from './components/Navbar';

export default function AppRoutes() {
  return (
    <AuthContextProvider>
      <Navbar />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="artists" element={<ArtistList />} />
        <Route path="artists/:id" element={<ArtistDetail />} />
        <Route path="register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

    </AuthContextProvider>
  );
}
