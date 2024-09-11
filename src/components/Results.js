import React from 'react';

function Results({ tracks, addToPlaylist }) {
  const squareContainer = {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '40%',
    margin: '50px auto',
  };

  const square = {
    width: '100%',
    height: '600px',
    backgroundColor: 'rgba(155, 89, 182, 0.5)',
    color: '#f8f9fa',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '10px',
    textAlign: 'left',
  };

  const h2Style = {
    border: 'none',
    borderBottom: '2px solid #f8f9fa',
    width: '100%',
    height: '30px',
    outline: 'none',
    color: '#f8f9fa',
    fontSize: '25px',
    marginTop: '20px',
  };

  const resultsStyle = {
    height: '500px', 
    overflowY: 'scroll',
    padding: '10px',
    margin: '10px 0',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '10px',
  };

  const trackStyle = {
    backgroundColor: 'transparent',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '8px',
    marginBottom: '10px',
  };

  const imgStyle = {
    width: '50px',
    height: '50px',
    borderRadius: '5px',
    marginRight: '15px',
  };

  const trackInfoStyle = {
    flex: 1,
    color: '#fff',
    marginLeft: '10px',
  };

  const buttonStyle = {
    fontSize: '30px',
    backgroundColor: 'transparent',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
  };

  return (
    <div style={squareContainer}>
      <div style={square}>
        <h2 style={h2Style}>Results</h2>
        <div style={resultsStyle}>
          {tracks.length === 0}
          {tracks.map(track => (
            <div key={track.id} style={trackStyle}>
              <img src={track.album.images[0]?.url} alt={track.name} style={imgStyle} />
              <div style={trackInfoStyle}>
                <p>{track.name} by {track.artists[0].name}</p>
              </div>
              <button style={buttonStyle} onClick={() => addToPlaylist(track)}>
                +
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Results;




