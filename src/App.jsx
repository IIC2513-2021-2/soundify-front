import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './views/Home';
import ArtistList from './views/ArtistList';
import ArtistDetail from './views/ArtistDetail';
import NotFound from './views/NotFound';

function App() {
  return (
    <BrowserRouter>
    <Navbar />
    <main>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/artist" element={<ArtistList/>} />
        <Route path="/artist/:id" element={<ArtistDetail/>} />
        <Route path='*' element={<NotFound/>} />
      </Routes>
    </main>
   
    </BrowserRouter>
  );
}

export default App;
