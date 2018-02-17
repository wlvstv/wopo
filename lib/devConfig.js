//Test credentials for twitch!
'use strict';
const un = 'geobot_twitch'; // Your twitch username
const pw = 'oauth:3fjp9rir5mm3kn2m4jh4ahazjczy9d'; // Your oAuth Token
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

