//Test credentials for twitch!
'use strict';
const un = 'geobot_twitch'; // Your twitch username
const pw = 'oauth:hx320uu9vvz810gh5y5brr1hmm9y5k'; // Your oAuth Token
exports.ch = un;
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

