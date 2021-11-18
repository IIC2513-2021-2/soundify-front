import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './views/Home';
import ArtistList from './views/ArtistList';
import ArtistDetail from './views/ArtistDetail';
import NotFound from './views/NotFound';

const App = function () {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route index element={<Home />} />
          <Route path="artists" element={<ArtistList />} />
          <Route path="artists/:id" element={<ArtistDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
