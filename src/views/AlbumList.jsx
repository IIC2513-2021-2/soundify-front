import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Deserializer } from 'jsonapi-serializer';
import config from '../config';
import useAuth from '../hooks/useAuth';

const AlbumList = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`${config.API_URL}/api/albums`)
      .then((response) => {
        if (!response.ok) {
          setError(true);
          return [];
        }
        return response.json();
      })
      .then((data) => new Deserializer({ keyForAttribute: 'camelCase' }).deserialize(data, (_error, albumList) => setAlbums(albumList)))
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
          {albums.map(({ id, name }) => (
            <div key={id}>
              <Link to={`/albums/${id}`}>{name}</Link>
            </div>
          ))}
          {currentUser ? (
            <button onClick={() => navigate('/albums/new')} type="button" className="button">Create Album</button>
          ) : (
            <p>Log in to create a new album</p>
          )}
        </>
      )}
    </section>
  );
};

export default AlbumList;
