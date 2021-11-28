import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Deserializer } from 'jsonapi-serializer';
import SingleAlbum from '../components/SingleAlbum';
import config from '../config';

const AlbumDetail = function () {
  const { id } = useParams();
  const navigate = useNavigate();

  const [album, setAlbum] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`${config.API_URL}/api/albums/${id}`)
      .then((response) => {
        if (!response.ok) {
          setError(true);
          return null;
        }
        return response.json();
      })
      .then((data) => new Deserializer({ keyForAttribute: 'camelCase' }).deserialize(data, (_error, albumData) => setAlbum(albumData)))
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
          <SingleAlbum album={album} />
          <div>
            <button onClick={() => navigate('edit')} type="button" className="button">Edit</button>
          </div>
          <div>
            <button onClick={() => navigate(-1)} type="button" className="button">Back</button>
          </div>
        </>
      )}
    </section>
  );
};

export default AlbumDetail;
