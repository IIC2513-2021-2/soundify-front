import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from "react-router-dom";
import Albums from "../components/Albums";

const ArtistDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
    .then((response) => {
      if (response.status !== 200) {
        setError(true)
      }
      return response.json()
    })
    .then(setArtist)
    .catch(() => setError(true))
    .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className= 'container'>
        <h2>Loading...</h2>
      </section>
    );
  }

  return(
    <section className= 'container'>
      <Link to='/'>Home</Link>
      {error ? (
        <h2>Error</h2>
      ) : (
        <>
          <h2>{artist?.name}</h2>
          <Albums />
          <div>
            <button onClick={() => navigate(-1)} type="button" className="button">Back</button>
          </div>
        </>
      )}
    </section>  
  )
}

export default ArtistDetail;
