import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './views/Home';
import ArtistList from './views/ArtistList';
import ArtistDetail from './views/ArtistDetail';
import NotFound from './views/NotFound';
import Register from './views/Register';
import Login from './views/Login';
import AuthContextProvider from './contexts/AuthContext';

const App = function () {
  return (

    <BrowserRouter>
      <AuthContextProvider>
        <Navbar />
        <main>
          <Routes>
            <Route index element={<Home />} />
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route path="artists" element={<ArtistList />} />
            <Route path="artists/:id" element={<ArtistDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </AuthContextProvider>
    </BrowserRouter>

  );
};

export default App;
