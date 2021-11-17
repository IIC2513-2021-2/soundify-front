import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className= 'container'>
      <h2>404 Error</h2>
      <p>The page you are looking for does not exist</p>
      <Link to="/">Home</Link>
    </section>
  );
}
