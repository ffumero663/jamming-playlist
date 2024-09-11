import React from 'react';

function Playlist({ playlist, removeFromPlaylist, createPlaylist, handlePlaylistNameChange, playlistName }) {
  const squareContainer = {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    width: '40%',
    margin: '50px auto',
  };

  const square = {
    position: 'relative',
    width: '100%',
    height: '600px',
    backgroundColor: 'rgba(155, 89, 182, 0.5)',
    color: '#f8f9fa',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '10px',
    textAlign: 'left',
  };

  const input = {
    background: 'none',
    border: 'none',
    borderBottom: '2px solid #f8f9fa',
    width: '100%',
    height: '30px',
    outline: 'none',
    color: '#f8f9fa',
    fontSize: '25px',
    marginTop: '20px',
    textAlign: 'center',
  };

  const button = {
    position: 'absolute',
    bottom: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: '#9b59b6',
    color: '#ffffff',
    border: 'none',
    padding: '12px 80px',
    borderRadius: '25px',
    fontSize: '20px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    fontWeight: 700,
  };

  const playlistStyle = {
    height: '400px',
    overflowY: 'scroll',
    padding: '10px',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '10px',
    marginBottom: '20px',
  };

  const trackStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '8px',
    marginBottom: '10px',
  };

  const imgStyle = {
    width: '50px',
    height: '50px',
    borderRadius: '5px',
  };

  const trackInfoStyle = {
    flex: 1,
    color: '#fff',
    marginLeft: '10px',
  };

  const removeButtonStyle = {
    fontSize: '30px',
    backgroundColor: 'transparent',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
  };

  return (
    <div style={squareContainer}>
      <div style={square}>
        <input 
          id="playlistName"
          name="playlistName"
          style={input} 
          placeholder="Playlist Name" 
          value={playlistName}
          onChange={handlePlaylistNameChange}
        />
        <div style={playlistStyle}>
          {playlist.length === 0 ? (
            <p style={{ color: '#f8f9fa', textAlign: 'center' }}>Add songs</p>
          ) : (
            playlist.map((track) => (
              <div key={track.id} style={trackStyle}>
                <img src={track.album.images[0]?.url} alt={track.name} style={imgStyle} />
                <div style={trackInfoStyle}>
                  <p>{track.name} by {track.artists[0].name}</p>
                </div>
                <button style={removeButtonStyle} onClick={() => removeFromPlaylist(track.id)}>
                  -
                </button>
              </div>
            ))
          )}
        </div>
        <button
          style={button}
          onClick={createPlaylist}
        >
          Create Playlist
        </button>
      </div>
    </div>
  );
}

export default Playlist;




