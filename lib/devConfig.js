//Test credentials for twitch!
'use strict';
const un = 'BETA_W0LF'; // Your twitch username
const pw = 'oauth:b8x2jvfml7wis5o7b7iex5pyw1ju0u'; // Your oAuth Token
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
//Let me know when you can hear anything :)
