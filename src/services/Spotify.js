const SPOTIFY_API_URL = 'https://api.spotify.com/v1';

// Function to search songs using Spotify API
export async function searchTracks(query, token) {
  if (!query) {
    console.error("Search query is empty");
    throw new Error("Please enter a search term.");
  }

  try {
    const response = await fetch(`${SPOTIFY_API_URL}/search?q=${encodeURIComponent(query)}&type=track&limit=10`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const responseText = await response.text();
    console.log("Raw response from Spotify:", responseText);

    const data = JSON.parse(responseText);

    if (!response.ok) {
      throw new Error(`Error: ${data.error?.message || 'Failed to search tracks'}`);
    }

    return data.tracks.items;

  } catch (error) {
    console.error("Error searching tracks:", error.message);
    throw error;
  }
}


// Function to create a playlist
export async function createSpotifyPlaylist(userId, playlistName, token) {
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
    console.log('Playlist Creation Response:', data);

    if (response.ok) {
      return {
        playlistId: data.id,
        message: `Playlist "${playlistName}" created successfully!`,
      };
    } else {
      throw new Error(`Failed to create playlist: ${data.error?.message}`);
    }
  } catch (error) {
    console.error('Error creating playlist:', error); 
    return {
      message: 'Error creating playlist: ' + error.message,
    };
  }
}

// Function to add tracks to a playlist
export async function addTracksToPlaylist(playlistId, trackUris, token) {
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
    console.log('Add Tracks Response:', data); 

    if (!response.ok) {
      throw new Error('Failed to add tracks to playlist');
    }
  } catch (error) {
    console.error('Error adding tracks to playlist:', error.message);
    throw error;
  }
}

