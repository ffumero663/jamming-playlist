import React, { useState, useEffect } from 'react';
import Header from './components/JammingHeader';
import SearchBar from './components/JammingSearch';
import Results from './components/Results';
import Playlist from './components/Playlist';
import { authenticate, getAccessToken } from './SpotifyAuth';
import { searchTracks, createSpotifyPlaylist, addTracksToPlaylist } from './services/Spotify'; 
import purpleBackground from './images/purpleBackground.jpg'; 

function App() {
  const [token, setToken] = useState('');
  const [tracks, setTracks] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [playlistName, setPlaylistName] = useState(''); 
  const [userId, setUserId] = useState(''); 
  const [message, setMessage] = useState(''); // For success/error message

  useEffect(() => {
    const tokenFromUrl = getAccessToken();
    const tokenFromStorage = window.localStorage.getItem('spotifyAccessToken'); // Get token from localStorage
    const finalToken = tokenFromUrl || tokenFromStorage;

    if (finalToken) {
      console.log("Token obtained:", finalToken); 
      setToken(finalToken);
      fetchUserId(finalToken); // Fetch the userId
    } else {
      setMessage('Please login to Spotify to use the app.');
    }
  }, []);

  const fetchUserId = async (token) => {
    try {
      const response = await fetch('https://api.spotify.com/v1/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch user ID');
      }
      const data = await response.json();
      console.log('User ID:', data.id); 
      setUserId(data.id); 
    } catch (error) {
      console.error('Error fetching user ID:', error);
      setMessage('Error fetching user ID: ' + error.message);
    }
  };

  const handleSearch = async (query) => {
    if (!token) return;
    try {
      const results = await searchTracks(query, token);
      setTracks(results);
      console.log('Search Results:', results); 
    } catch (error) {
      console.error("Error searching tracks:", error.message);
      setMessage("Error searching tracks: " + error.message); 
    }
  };

  const addToPlaylist = (track) => {
    if (!playlist.some((t) => t.id === track.id)) {
      setPlaylist([...playlist, track]);
    }
  };

  const removeFromPlaylist = (trackId) => {
    setPlaylist(playlist.filter((track) => track.id !== trackId));
  };

  const createPlaylist = async () => {
    console.log("Create Playlist button clicked"); 

    if (!playlistName || playlist.length === 0) {
      setMessage('Please enter a playlist name and add tracks to the playlist.');
      return;
    }

    console.log('Token:', token); 
    console.log('User ID:', userId); 
  
    try {
      const { playlistId, message } = await createSpotifyPlaylist(userId, playlistName, token);
      setMessage(message);

      const trackUris = playlist.map((track) => track.uri); // Ensure the correct URIs are passed
      console.log('Track URIs:', trackUris); 
      await addTracksToPlaylist(playlistId, trackUris, token);
  
      setMessage(`Playlist "${playlistName}" created successfully with ${playlist.length} tracks`);
    } catch (error) {
      console.error('Error creating playlist:', error); 
      setMessage('Error creating playlist: ' + error.message);
    }
  };

  const handlePlaylistNameChange = (e) => {
    setPlaylistName(e.target.value);
  };

  const handleLogout = () => {
    setToken('');
    window.localStorage.removeItem('spotifyAccessToken'); // Remove token on logout
    window.location.hash = '';
    window.location.reload();
  };

  const logOutButton ={
    marginTop: '0%',
    marginBottom: '25px',
    marginLeft: '41%',
    backgroundColor: '#9b59b6', 
    color: '#ffffff', 
    border: 'none', 
    padding: '12px 80px', 
    borderRadius: '25px', 
    fontSize: '30px', 
    cursor: 'pointer', 
    transition: 'background-color 0.3s ease', 
    fontWeight: 700,
  };

  const logOutButtonHover ={
    backgroundColor: '#8e44ad',
  };

  const appStyle = {
    backgroundImage: `url(${purpleBackground})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '100vh',  // Full screen height
    width: '100vw',   // Full screen width
  };

  const appStylePlaylist = {
    backgroundImage: `url(${purpleBackground})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '130vh',  // Full screen height
    width: '100vw',   // Full screen width
  };
  
  const containerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    width: '80%',
    margin: '50px auto',
    alignItems: 'flex-start',
  };
  
  const button ={
    marginTop: '15%',
    marginLeft: '37%',
    backgroundColor: '#9b59b6', 
    color: '#ffffff', 
    border: 'none', 
    padding: '12px 80px', 
    borderRadius: '25px', 
    fontSize: '30px', 
    cursor: 'pointer', 
    transition: 'background-color 0.3s ease', 
    fontWeight: 700,
  };

  const buttonHover ={
    backgroundColor: '#8e44ad',
  };

  return (
    <div style={appStyle}>
      <Header />
      {!token ? (
        <button 
        onClick={authenticate} 
        style={button}
        onMouseEnter={(e) => e.target.style.backgroundColor = buttonHover.backgroundColor}
        onMouseLeave={(e) => e.target.style.backgroundColor = button.backgroundColor}
          >
          Login with Spotify
        </button>    
      ) : (
        <>
          <div style={appStylePlaylist}>
            <SearchBar onSearch={handleSearch} />
            <div style={containerStyle}>
              <Results tracks={tracks} addToPlaylist={addToPlaylist} />
              <Playlist
                playlist={playlist}
                removeFromPlaylist={removeFromPlaylist}
                createPlaylist={createPlaylist}
                handlePlaylistNameChange={handlePlaylistNameChange}
                playlistName={playlistName}
              />
            </div>
          </div>
          {/* Display success or error message */}
          <p style={{ color: 'white', textAlign: 'center', marginTop: '20px' }}>{message}</p> 
          <button 
                onClick={handleLogout} 
                style={logOutButton}
                onMouseEnter={(e) => e.target.style.backgroundColor = logOutButtonHover.backgroundColor}
                onMouseLeave={(e) => e.target.style.backgroundColor = logOutButton.backgroundColor}
              >
                Log Out
              </button>
        </>
      )}
    </div>
  );
}

export default App;





