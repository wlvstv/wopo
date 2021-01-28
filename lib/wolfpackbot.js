'use strict';
const tmi = require('tmi.js');
const config = require('./config.js');
const botConfig = config.getConfigContext();
const chat = require('./chat.js');
const { enforceThresholds } = require('gulp-istanbul');
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

  //regex to determine if message is a link
  var regex = /[-a-zA-Z0-9@:%_\+~#?&//=]{2,256}\.[a-z]{2,3}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var isLink = message.match(regex);
  var regex2 = /(clips\.twitch\.tv)/gi;
  var isClip = message.match(regex2);
  var timeoutMSG = "@" + user.username + " no links in chat. Whisper the link to a mod.";

  //allow subs to post clip links, timeout all other links
  if(user.subscriber && isClip) {

  } else if(!(user.username.toString().toLowerCase() == botConfig.ch  || user.mod) && isLink) {
    wolvesChat.timeout(channel, user.username, 5, "posted link");
    wolvesChat.say(channel, timeoutMSG);
  }

  //Short circuit messages that have no prefix OR are by the bot
  if (!message.startsWith(prefix) || user.username === wolvesChat.getUsername()) return;

  //if we have a response for this
  let command = message.split(' ')[0];
  chat.checkCommand(command, channel, user, message);
});

wolvesChat.connect();
