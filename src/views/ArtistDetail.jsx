import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Albums from '../components/Albums';

const ArtistDetail = function () {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <section className="container">
      <Link to="/">Home</Link>
      <h2>{`Artist ${id}`}</h2>
      <Albums />
      <div>
        <button onClick={() => navigate(-1)} type="button" className="button">Back</button>
      </div>
    </section>
  );
};

export default ArtistDetail;
