import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './AppRoutes';

const App = function () {
  return (
    <BrowserRouter>
      <main>
        <AppRoutes />
      </main>
    </BrowserRouter>
  );
};

export default App;
