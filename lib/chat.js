//Chat functions!
'use strict';
let wolvesChat;
//response obj

exports.responses = {
  '!beep': boop,
  '!hi': (channel, user, message) => {
    wolvesChat.whisper(user.username, 'HeyGuys');
  }
};

exports.init = chat => {
  wolvesChat = chat;
};

function boop(channel, user, message) {
  wolvesChat.say(channel, 'boop!');
}
