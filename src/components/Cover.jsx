import React from 'react';
import Pathways from './Pathways';
import useAuth from '../hooks/useAuth';

const Cover = function () {
  const { currentUser } = useAuth();
  return (
    <section className="cover">
      <h1>
        Welcome
        {' '}
        {currentUser?.firstName}
        {' '}
        to the most comprehensive artists catalogue
      </h1>
      <Pathways />
    </section>
  );
};

export default Cover;
