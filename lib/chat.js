//Chat functions!
'use strict';
const db = require('./db.js');
const config = require('./devConfig.js');
const fn = require('./fortnite.js');
let wolvesChat;
//response obj

const responses = {
  '!beep': boop,
  '!hi': (channel, user, message) => {
    wolvesChat.whisper(user.username, 'HeyGuys');
  },
  '!addcomm?': (channel, user, message) => {
    if (user.mod) {
      wolvesChat.say(channel, 'format: !addcomm <!command> <response>');
    }
  },
  '!addcomm': addCommand,
  '!updatecomm?': (channel, user, message) => {
    if (user.mod) {
      wolvesChat.say(channel, 'Format: !updatecomm <!command> <New Response>');
    }
  },
  '!updatecomm': updateCommand,
  '!deletecomm?': (channel, user, message) => {
    if (user.mod) {
      wolvesChat.say(channel, 'Format: !deletecom <!Command>');
    }
  },
  '!deletecom': deleteCommand,
  '!ftn': getStats
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
function executeCommand(channel, response) {
  wolvesChat.say(config.ch, response);
}
// Error function
function commandError(command, error) {
  if (error.received === 0) {
    console.log(`The command ${command} does not exist`);
  }
}
// Add command
function addCommand(channel, user, message) {
  if (user.mod) {
    let command = message.split(' ')[1];
    if (!command.toString().startsWith('!')) return;
    let response = message
      .split(' ')
      .slice(2)
      .join(' ');
    db.newCommand(
      command,
      false,
      response,
      user.username,
      channel,
      (channel, command) => {
        wolvesChat.say(channel, `created command ${command}`);
      },
      (command, user, error) => {
        wolvesChat.whisper(
          user.username,
          `Error adding the command: ${error.message}`
        );
      }
    );
  }
}
// Update Command
function updateCommand(channel, user, message) {
  // Update stuff here
  if (user.mod) {
    let command = message.split(' ')[1];
    if (!command.toString().startsWith('!')) return;
    let response = message
      .split(' ')
      .splice(2)
      .join(' ');
    db.updateCommand(
      command,
      true,
      response,
      user.username,
      config.ch,
      (channel, command) => {
        // Say stuff updated okay
        wolvesChat.say(channel, `Command ${command} was updated successfully!`);
      },
      user => {
        wolvesChat.whisper(user.username, 'Error adding the command');
      }
    );
  }
}
// Get Fortnite Stats
async function getStats(channel, user, message) {
  const strStrat = '';
  const messageArray = message.split(' ');
  if (messageArray.length <= 1) {
    const strStat = await fn.getStats(message + ' default');
    wolvesChat.say(channel, `${strStat.data}`);
  } else {
    const fnData = await fn.getStats(message);
    wolvesChat.say(
      channel,
      `${channel} has ${fnData.data} ${fnData.mode} wins!`
    );
  }
}
// Get Fortnite Stats
async function getStats(channel, user, message) {
  const strStrat = '';
  const messageArray = message.split(' ');
  if (messageArray.length <= 1) {
    const strStat = await fn.getStats(message + ' default');
    wolvesChat.say(channel, `${strStat.data}`);
  } else {
    const fnData = await fn.getStats(message);
    wolvesChat.say(
      channel,
      `${channel} has ${fnData.data} ${fnData.mode} wins!`
    );
  }
}
