//Test credentials for twitch!
'use strict';
const un = 'geobot_twitch'; // Your twitch username
const pw = 'oauth:8d5hkpxu9i0ez54s9n7gjjvgt7ls84'; // Your oAuth Token
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
