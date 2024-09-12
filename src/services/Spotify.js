import { authenticate } from "../SpotifyAuth";

const SPOTIFY_API_URL = 'https://api.spotify.com/v1';

// Function to search songs using Spotify API
// Function to search songs using Spotify API
export async function searchTracks(query, token) {
  if (!query) {
    throw new Error("Please enter a search term.");
  }

  try {
    const response = await fetch(`${SPOTIFY_API_URL}/search?q=${encodeURIComponent(query)}&type=track&limit=10`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    // Check if token is invalid or expired
    if (response.status === 401 || response.status === 403) {
      console.error('Access token invalid or expired. Re-authenticating...');
      authenticate();  // Trigger re-authentication if token is invalid
      return;
    }

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error: ${errorData.error?.message || 'Failed to search tracks'}`);
    }

    const data = await response.json();
    return data.tracks.items;

  } catch (error) {
    console.error("Error searching tracks:", error.message);
    throw error;
  }
}



// Function to create a playlist
// Function to create a playlist
export async function createSpotifyPlaylist(userId, playlistName, token) {
  if (!playlistName || !userId) {
    throw new Error("Invalid playlist name or user ID.");
  }

  try {
    const response = await fetch(`${SPOTIFY_API_URL}/users/${userId}/playlists`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: playlistName,
        description: 'New playlist from Jamming app',
        public: false,
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(`Failed to create playlist: ${data.error?.message}`);
    }

    return {
      playlistId: data.id,
      message: `Playlist "${playlistName}" created successfully!`,
    };

  } catch (error) {
    console.error('Error creating playlist:', error.message);
    throw new Error(`Error creating playlist: ${error.message}`);
  }
}


// Function to add tracks to a playlist
// Function to add tracks to a playlist
export async function addTracksToPlaylist(playlistId, trackUris, token) {
  if (!playlistId || trackUris.length === 0) {
    throw new Error("Invalid playlist ID or no tracks to add.");
  }

  try {
    const response = await fetch(`${SPOTIFY_API_URL}/playlists/${playlistId}/tracks`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        uris: trackUris, 
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(`Failed to add tracks to playlist: ${data.error?.message}`);
    }

    return data;  // Success response can be used for further actions (if needed)

  } catch (error) {
    console.error('Error adding tracks to playlist:', error.message);
    throw new Error(`Error adding tracks to playlist: ${error.message}`);
  }
}


