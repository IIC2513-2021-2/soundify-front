import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";

const artist = [
  { 
    id: 1,
    name: 'Taylor Swift' 
  },
  { 
    id: 2,
    name: 'Kanye West' 
  },
];

const ArtistList = () => {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch('https://jsonplaceholder.typicode.com/user')
    .then((response) => {
      if (response.status !== 200) {
        setError(true)
      }
      response.json()
    })
    .then(setArtists)
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

  if (error) {
    return (
      <section className="container">
        <h2>Error</h2>
      </section>
    )
  }

  return(
    <section className= 'container'>
      <Link to='/'>Home</Link>
      <h2>Artists</h2>
      {artists.map(({ id, name }) => (
        <div key={id}>
          <Link to={`/artists/${id}`}>{`${name}`}</Link>
        </div>
      ))}
    </section>
  )
}

export default ArtistList;
