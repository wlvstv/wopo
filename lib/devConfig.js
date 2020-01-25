//Test credentials for twitch!
'use strict';
const un = 'derekmartian'; // Your twitch username
const pw = 'oauth:k8o0gqdrv062srvp6tu8n5qairgrqy'; // Your oAuth Token
exports.ch = un;
exports.twitchCID = 'f7e91n3xy87ctlidtnebduxadv3gnc'; //Twitch Client ID (We can use this for testing)
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
// These credentials can be retrieved from https://developer.spotify.com/documentation/general/guides/app-settings/
exports.spotifyCredentials = {
  client_id: '9a567e005fb14a6d992b135b0d6421c9', // Your spotify client id
  client_secret: '0c62df9f64194c12be050ed222f04acf', // Your spotify secret
  redirect_uri: 'https://www.wlvs.tv', // Your redirect url
  refresh_token: 'AQDnV4AW_ozClk55T7ziZsB7gqo6TyRbBy-ZGiFRT44xvTM2c4187PSa9PI5dTv5qeyZGqqiOokFJgdWOmWXOe4ox7kxTpOowtf4-sD_ca5OpCf87atCZ75EOcUw2Uc6jVU' //retrieved from your first access token call (see SpotifyAPI.js)
}
