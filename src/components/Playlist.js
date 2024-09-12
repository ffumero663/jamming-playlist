import React from 'react';
import '../styles/Playlist.css';

function Playlist({ playlist, removeFromPlaylist, createPlaylist, handlePlaylistNameChange, playlistName }) {

  return (
    <div className='squareContainer'>
      <div className='square'>
        <input 
          id="playlistName"
          name="playlistName"
          className='input' 
          placeholder="Playlist Name" 
          value={playlistName}
          onChange={handlePlaylistNameChange}
        />
        <div className='playlistStyle'>
          {playlist.length === 0 ? (
            <p className='addSongs'>Add songs</p>
          ) : (
            playlist.map((track) => (
              <div key={track.id} className='trackStyle'>
                <img src={track.album.images[0]?.url} alt={track.name} className='imgStyle' />
                <div className='trackInfoStyle'>
                  <p>{track.name} by {track.artists[0].name}</p>
                </div>
                <button className='removeButtonStyle' onClick={() => removeFromPlaylist(track.id)}>
                  -
                </button>
              </div>
            ))
          )}
        </div>
        <button
          className='button'
          onClick={createPlaylist}
        >
          Create Playlist
        </button>
      </div>
    </div>
  );
}

export default Playlist;




