import React from 'react';
import SingleAlbum from './SingleAlbum';

const albums = [{
  albumId: 1,
  name: 'Red (Taylor\'s Version)',
  artist: 'Taylor Swift',
  cover: 'data:image/jpeg;base64,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',
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

function Albums() {  
  return (
    <div>
      <ul class="albums">
        {albums.map((album) => (
          <SingleAlbum key={album.albumId} album={album} />
        ))}
      </ul>
    </div>
    
  );
}

export default Albums;
