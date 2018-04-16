//Test credentials for twitch!
'use strict';
const un = 'airfriedbot'; // Your twitch username
const pw = 'oauth:cqzuwsff1ggurgbthl7qh9tso91dty'; // Your oAuth Token
exports.ch = un;
exports.twitchCID = 'plrxzzx0pyke4i3u4d7n3lu0xf0ioc'; //Twitch Client ID (We can use this for testing)
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
