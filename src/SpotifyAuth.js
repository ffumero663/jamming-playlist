<<<<<<< HEAD
const CLIENT_ID = '3f5a58c6617841bba9dc54348b641d96'; // Your Spotify Client ID
const REDIRECT_URI = 'https://jammingappplaylists.netlify.app/';
=======
const CLIENT_ID = '3f5a58c6617841bba9dc54348b641d96'; 
const REDIRECT_URI = 'https://jammingappplaylists.netlify.app'; 
>>>>>>> 3c18e9cde2522ac71cbf2fbcd7654beae87118aa
const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
const RESPONSE_TYPE = 'token';
const SCOPES = [
  'playlist-modify-public',
  'playlist-modify-private',
  'user-read-private',
  'user-read-email',
];

export function authenticate() {
  const authUrl = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${SCOPES.join(
    '%20'
  )}&response_type=${RESPONSE_TYPE}&show_dialog=true`;
  window.location = authUrl;
}

export function getAccessToken() {
  const hash = window.location.hash;
  const params = new URLSearchParams(hash.replace('#', ''));
  const accessToken = params.get('access_token');
  
  if (accessToken) {
    // Store the token in localStorage for future use
    window.localStorage.setItem('spotifyAccessToken', accessToken);
    window.location.hash = ''; // Clean up the URL after storing the token
  }

  return accessToken || window.localStorage.getItem('spotifyAccessToken');
}

