import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './views/Home';
import ArtistList from './views/ArtistList';
import ArtistDetail from './views/ArtistDetail';
import NotFound from './views/NotFound';
import Login from './views/Login';
import AuthContextProvider from './contexts/AuthContext';

export default function AppRoutes() {
  return (
    <AuthContextProvider>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="artists" element={<ArtistList />} />
        <Route path="artists/:id" element={<ArtistDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

    </AuthContextProvider>
  );
}
