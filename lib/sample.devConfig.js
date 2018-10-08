//Test credentials for twitch!
'use strict';
const un = ''; // Your twitch username
const pw = ''; // Your oAuth Token
exports.ch = un;
exports.twitchCID = 'f7e91n3xy87ctlidtnebduxadv3gnc'; //Twitch Client ID (We can use this for testing)
exports.clientSecret = ''
exports.OAuthToken = ''
exports.options = {
  options: {
    debug: true //debugging on
  },
  connection: {
    cluster: 'aws',
    secure: true,
    reconnect: true
  },
  identity: {
    username: un,
    password: pw
  },
  channels: [un]
}
// Reference Spotify's Authorization guide on how to retrieve these credentials https://developer.spotify.com/documentation/general/guides/authorization-guide/#authorization-code-flow
exports.spotifyCredentials = {
  client_id: '', // Your client id
  client_secret: '', // Your secret
  redirect_uri: 'https://www.example.cool/', // Your redirect uri
  refresh_token: ''
}
