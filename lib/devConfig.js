//Test credentials for twitch!
'use strict';
const un = 'BETA_W0LF'; // Your twitch username
const pw = ''; // Your oAuth Token
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

