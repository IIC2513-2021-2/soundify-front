import React from 'react';
import SingleAlbum from './SingleAlbum';

const albums = [{
  albumId: 1,
  name: 'Red (Taylor\'s Version)',
  artist: 'Taylor Swift',
  cover: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/47/Taylor_Swift_-_Red_%28Taylor%27s_Version%29.png/220px-Taylor_Swift_-_Red_%28Taylor%27s_Version%29.png',
},
{
  albumId: 2,
  name: 'folklore',
  artist: 'Taylor Swift',
  cover: 'https://m.media-amazon.com/images/I/81OReT+-6JL._SL1200_.jpg',
},
{
  albumId: 3,
  name: 'Donda',
  artist: 'Kanye West',
  cover: 'https://www.esonosoy.com/wp-content/uploads/2021/09/donda-kanye-west.jpg',
}];

const Albums = function () {
  return (
    <div>
      <ul className="albums">
        {albums.map((album) => (
          <SingleAlbum key={album.albumId} album={album} />
        ))}
      </ul>
    </div>

  );
};

export default Albums;
