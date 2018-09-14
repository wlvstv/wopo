//Test credentials for twitch!
'use strict';
const un = 'derekthemartian'; // Your twitch username
const pw = 'oauth:ssgbbff0m9y1rx0x1vzft8wgkhs9oy'; // Your oAuth Token
exports.ch = un;
exports.twitchCID = 'f7e91n3xy87ctlidtnebduxadv3gnc'; //Twitch Client ID (We can use this for testing)
exports.clientSecret = 'q3k3eoug3hc7kunx2yt8mzchf5l3rs'
exports.OAuthToken = '8cagxcdjx3bazfv7dhdzt9lgn5eefo'
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
};
