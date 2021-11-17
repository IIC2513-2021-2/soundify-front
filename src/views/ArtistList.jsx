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

  useEffect(() => {
    setLoading(true);
    fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => response.json())
    .then(setArtists)
    .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <h2>Loading...</h2>
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
