import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './views/Home';
import ArtistList from './views/ArtistList';
import ArtistDetail from './views/ArtistDetail';
import NotFound from './views/NotFound';
import Login from './views/Login';
import AuthContextProvider from './contexts/AuthContext';

const App = function () {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Navbar />
        <main>
          <Routes>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="artists" element={<ArtistList />} />
            <Route path="artists/:id" element={<ArtistDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </BrowserRouter>
    </AuthContextProvider>
  );
};

export default App;
