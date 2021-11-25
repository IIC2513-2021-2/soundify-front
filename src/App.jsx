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
import AlbumList from './views/AlbumList';
import AlbumNew from './views/AlbumNew';
import AlbumDetail from './views/AlbumDetail';
import AlbumEdit from './views/AlbumEdit';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './AppRoutes';


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
            <Route path="albums" element={<AlbumList />} />
            <Route path="albums/new" element={<AlbumNew />} />
            <Route path="albums/:id" element={<AlbumDetail />} />
            <Route path="albums/:id/edit" element={<AlbumEdit />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </AuthContextProvider>
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;
