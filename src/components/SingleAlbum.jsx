import React from 'react';

function SingleAlbum({ album }) {
  return (
    <li>
      <h3>{album.name}</h3>
      <p>{album.artist}</p>
      <img alt="album-cover-show" src={album.cover} />
    </li>
  );
}

export default SingleAlbum;
