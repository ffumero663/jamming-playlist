const CLIENT_ID = '3f5a58c6617841bba9dc54348b641d96'; 
const REDIRECT_URI = 'https://jammingappplaylists.netlify.app';  // Ensure this matches exactly with Spotify Developer Dashboard
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

  console.log("Redirecting to authentication URL:", authUrl);  // Log the authentication URL
  window.location = authUrl;  // Redirect to Spotify's authentication page
}

export function getAccessToken() {
  const hash = window.location.hash;
  const params = new URLSearchParams(hash.replace('#', ''));
  const accessToken = params.get('access_token');

  if (accessToken) {
    window.localStorage.setItem('spotifyAccessToken', accessToken);
    window.location.hash = '';
  }

  console.log('Access token retrieved:', accessToken || window.localStorage.getItem('spotifyAccessToken'));

  return accessToken || window.localStorage.getItem('spotifyAccessToken');
}


export function clearAccessToken() {
  // Helper function to clear token when needed (e.g., logout)
  window.localStorage.removeItem('spotifyAccessToken');
  console.log('Access token cleared');
}


