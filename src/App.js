import React, { useState, useEffect } from 'react';
import Header from './components/JammingHeader';
import SearchBar from './components/JammingSearch';
import Results from './components/Results';
import Playlist from './components/Playlist';
import { authenticate, getAccessToken } from './SpotifyAuth';
import { searchTracks, createSpotifyPlaylist, addTracksToPlaylist } from './services/Spotify'; 
import purpleBackground from './images/purpleBackground.jpg'; 
import './App.css';

function App() {
  const [token, setToken] = useState('');
  const [tracks, setTracks] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [playlistName, setPlaylistName] = useState(''); 
  const [userId, setUserId] = useState(''); 
  const [message, setMessage] = useState('');

  useEffect(() => {
    const tokenFromUrl = getAccessToken();
    const tokenFromStorage = window.localStorage.getItem('spotifyAccessToken');
    const finalToken = tokenFromUrl || tokenFromStorage;
  
    if (finalToken) {
      setToken(finalToken);
      fetchUserId(finalToken);
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
  
      console.log('Response status:', response.status);  // Log the response status
  
      if (response.status === 401) {
        console.log('Unauthorized request, re-authenticating...');
        setMessage('Session expired, re-authenticating...');
        authenticate();  // Trigger re-authentication if token is invalid
        return;
      }
  
      // Check if the response is valid JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();  // Read response as text (HTML or error page)
        console.error('Non-JSON response:', text);  // Log the full error response for better debugging
        setMessage('Failed to fetch user information. Please check your token or try logging in again.');
        return;
      }
  
      const data = await response.json();
      setUserId(data.id);
    } catch (error) {
      console.error('Error fetching user ID:', error.message);
      setMessage('Error fetching user ID: ' + error.message);
    }
  };
  
  
  

  const handleSearch = async (query) => {
    if (!token) return;
    try {
      const results = await searchTracks(query, token);
      setTracks(results);
    } catch (error) {
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
    if (!playlistName || playlist.length === 0) {
      setMessage('Please enter a playlist name and add tracks to the playlist.');
      return;
    }

    try {
      const { playlistId, message } = await createSpotifyPlaylist(userId, playlistName, token);
      setMessage(message);

      const trackUris = playlist.map((track) => track.uri);
      await addTracksToPlaylist(playlistId, trackUris, token);
      setMessage(`Playlist "${playlistName}" created successfully with ${playlist.length} tracks`);
    } catch (error) {
      setMessage('Error creating playlist: ' + error.message);
    }
  };

  const handlePlaylistNameChange = (e) => {
    setPlaylistName(e.target.value);
  };

  const handleLogout = () => {
    setToken('');
    window.localStorage.removeItem('spotifyAccessToken');
    window.localStorage.removeItem('spotifyTokenExpiration');
    window.location.hash = '';
    authenticate();  // Force re-authentication to get a fresh token
  };
  
  
  

  return (
    <>
  <Header />

  <div  className='image'>
    
    {!token ? (
      <div className='center-container'>
      <button onClick={authenticate} className='log-in'>
        Login with Spotify
      </button>
      </div>
    ) : (
      <>
        <div>
          <SearchBar onSearch={handleSearch}/>

          <div className='containerStyle'>
            <Results tracks={tracks} addToPlaylist={addToPlaylist}  />
            <Playlist
              playlist={playlist}
              removeFromPlaylist={removeFromPlaylist}
              createPlaylist={createPlaylist}
              handlePlaylistNameChange={handlePlaylistNameChange}
              playlistName={playlistName}
            />
          </div>

          {/* Place Log Out button here, outside of containerStyle */}
          <button onClick={handleLogout} className='logOutButton'>
            Log Out
          </button>
          
          <p className='message'>{message}</p> 
        </div>
      </>
    )}
  </div>
</>

  );
}  

export default App;






