//Test credentials for twitch!
"use strict";
const un = "geobot_twitch"; // Your twitch username
const pw = "oauth:mfrgzta9121zf5e619qwi9dyhx1wtw"; // Your oAuth Token
exports.ch = un;
exports.options = {
  options: {
    debug: true //debugging on
  },
  connection: {
    cluster: "aws",
    secure: true,
    reconnect: true
  },
  identity: {
    username: un,
    password: pw
  },
  channels: [un]
};
