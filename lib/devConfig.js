//Test credentials for twitch!
'use strict';
const un = 'airfriedbot'; // Your twitch username
const pw = 'oauth:cqzuwsff1ggurgbthl7qh9tso91dty'; // Your oAuth Token
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
