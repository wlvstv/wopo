//Chat functions!
'use strict';
const db = require('./db.js');
let wolvesChat;
//response obj

const responses = {
  '!beep': boop,
  '!hi': (channel, user, message) => {
    wolvesChat.whisper(user.username, 'HeyGuys');
  },
  '!addcomm?': (channel, user, message) => {
    if(user.mod){
      wolvesChat.say(channel, 'format: !addcomm <!command> <response>');
    }
  },
  '!addcomm': addCommand
};

exports.checkCommand = (command, channel, user, message) => {
  if (responses[command]) {
    responses[command](channel, user, message);
  } else {
    db.getCommand(command, channel, user.mod, executeCommand, commandError);
  }
};

exports.init = chat => {
  wolvesChat = chat;
};
//Simple response
function boop(channel, user, message) {
  wolvesChat.say(channel, 'boop!');
}
// Execute db command
function executeCommand(response) {
  wolvesChat.say(channel, response);
}
// Error function
function commandError(command, error) {
  if (error.received === 0) {
    console.log(`The command ${command} does not exist`);
  }
}
// Add command
function addCommand(channel, user, message) {
  if(user.mod){
    let command  = message.split(' ')[1];
    if(!command.toString().startsWith('!')) return;
    let response = message.split(' ').slice(2).join(' ');
    db.newCommand(command,
      false,
      response,
      user.username,
      channel,
      (channel, command)=>{
        wolvesChat.say(channel,`created command ${command}`)
      },
      (user)=>{
        wolvesChat.whisper(user.username, 'Error adding the command')
      }
    );
  }
}
