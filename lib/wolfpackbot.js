'use strict';
const tmi = require('tmi.js');
const config = require('./config.js');
const botConfig = config.getConfigContext();
const chat = require('./chat.js');
const wolvesChat = new tmi.client(botConfig.options);
chat.init(wolvesChat);
//Initialization
wolvesChat.on('connected', (address, port) => {
  console.log(`Wolfpackbot connected on: ${address}:${port} as ${wolvesChat.getUsername()}`);
});

//On a chat message...
wolvesChat.on('chat', (channel, user, message, self) => {
  // Set the prefix
  let prefix = '!';
  //Short circuit messages that have no prefix OR are by the bot
  if (!message.startsWith(prefix) || user.username === wolvesChat.getUsername()) return;
  //if we have a response for this
  let command = message.split(' ')[0];
  chat.checkCommand(command, channel, user, message);
});

wolvesChat.connect();
