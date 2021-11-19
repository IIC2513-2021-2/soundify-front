import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Deserializer } from 'jsonapi-serializer';
import Albums from '../components/Albums';
import config from '../config';

const ArtistDetail = function () {
  const { id } = useParams();
  const navigate = useNavigate();

  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`${config.API_URL}/api/artists/${id}`)
      .then((response) => {
        if (!response.ok) {
          setError(true);
          return null;
        }
        return response.json();
      })
      .then((data) => new Deserializer({ keyForAttribute: 'camelCase' }).deserialize(data, (_error, artistData) => setArtist(artistData)))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="container">
        <h2>Loading...</h2>
      </section>
    );
  }

  return (
    <section className="container">
      <Link to="/">Home</Link>
      {error ? (
        <h2>Error</h2>
      ) : (
        <>
          <h2>{artist?.name}</h2>
          <h3>{`Members: ${artist?.members}`}</h3>
          <h3>{`Origin: ${artist?.origin}`}</h3>
          <h3>{`Founded in: ${artist?.foundedIn}`}</h3>
          <Albums />
          <div>
            <button onClick={() => navigate(-1)} type="button" className="button">Back</button>
          </div>
        </>
      )}
    </section>
  );
};

export default ArtistDetail;
