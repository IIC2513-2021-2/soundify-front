import React from 'react';

const SingleAlbum = function ({ album }) {
  return (
    <div>
      <h3>{album?.name}</h3>
      <p>{album?.artist}</p>
      <img alt={`${album?.name}, album from ${album?.artist}`} src={album?.cover} />
    </div>
  );
};

export default SingleAlbum;
