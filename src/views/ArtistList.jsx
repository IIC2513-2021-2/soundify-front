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
  return(
    <section class= 'container'>
      <Link to='/'>Home</Link>
      <h2>Artists</h2>
      {artist.map((artist) => <div key={artist.id}><Link to={`/artist/${artist.id}`}>{`${artist.name}`}</Link></div>)}
    </section>
  )
}

export default ArtistList;