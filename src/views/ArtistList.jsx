import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Deserializer } from 'jsonapi-serializer';
import config from '../config';

const ArtistList = () => {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`${config.API_URL}/api/artists`)
      .then((response) => {
        if (!response.ok) {
          setError(true);
          return [];
        }
        return response.json();
      })
      .then((data) => new Deserializer({ keyForAttribute: 'camelCase' }).deserialize(data, (_error, artistList) => setArtists(artistList)))
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
          <h2>Artists</h2>
          {artists.map(({ id, name }) => (
            <div key={id}>
              <Link to={`/artists/${id}`}>{name}</Link>
            </div>
          ))}
        </>
      )}
    </section>
  );
};

export default ArtistList;
