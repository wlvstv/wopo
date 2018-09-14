//Test credentials for twitch!
'use strict';
const un = ''; // Your twitch username
const pw = ''; // Your oAuth Token
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
};
