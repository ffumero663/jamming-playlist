const CLIENT_ID = 'ab38e51d4007417dade1a716ad3de347'; 
const REDIRECT_URI = 'http://localhost:3005/';  // Ensure this matches exactly with Spotify Developer Dashboard
const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
const RESPONSE_TYPE = 'token';
const SCOPES = [
  'playlist-modify-public',
  'playlist-modify-private',
  'user-read-private',
  'user-read-email',
  // Add any other scopes your app needs based on functionality
];

export function authenticate() {
  const authUrl = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${SCOPES.join(
    '%20'
  )}&response_type=${RESPONSE_TYPE}&show_dialog=true`;

  console.log("Redirecting to authentication URL:", authUrl);  // Log the authentication URL
  window.location = authUrl;  // Redirect to Spotify's authentication page
}


export function getAccessToken() {
  // Check if token is in the URL hash (when redirected from Spotify login)
  const hash = window.location.hash;
  const params = new URLSearchParams(hash.replace('#', ''));
  const accessToken = params.get('access_token');
  const expiresIn = params.get('expires_in');  // Token expiration time in seconds

  // If a new access token is found in the URL, save it in localStorage
  if (accessToken) {
    const expirationTime = new Date().getTime() + expiresIn * 1000;  // Calculate token expiration time
    window.localStorage.setItem('spotifyAccessToken', accessToken);
    window.localStorage.setItem('spotifyTokenExpiration', expirationTime);
    window.location.hash = '';  // Clear the URL hash to avoid processing it again
  }

  // Retrieve the stored token and expiration time from localStorage
  const storedToken = window.localStorage.getItem('spotifyAccessToken');
  const expirationTime = window.localStorage.getItem('spotifyTokenExpiration');

  // Check if the token has expired
  if (storedToken && expirationTime && new Date().getTime() < expirationTime) {
    return storedToken;  // Token is valid, return it
  } else {
    // If no valid token is found or token is expired, return null
    return null;
  }
}




export function clearAccessToken() {
  window.localStorage.removeItem('spotifyAccessToken');
  window.localStorage.removeItem('spotifyTokenExpiration');
  console.log('Access token cleared');
}


