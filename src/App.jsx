import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './views/Home';
import ArtistList from './views/ArtistList';
import ArtistDetail from './views/ArtistDetail';
import NotFound from './views/NotFound';
import Login from './views/Login';
import AuthContextProvider from './contexts/AuthContext';
import Routes from './AppRoutes';

const App = function () {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes />
      </main>
    </BrowserRouter>
  );
};

export default App;
