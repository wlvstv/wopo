//Chat functions!
'use strict';
const db = require('./db.js'),
  cfg = require('./config.js'),
  config = cfg.getConfigContext(),
  fn = require('./fortnite.js'),
  api = require('./TwitchAPI.js'),
  util = require('./util.js');

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
  '!ftn': getStats,
  '!caster': getCasterInfo,
  '!uptime': getUptime,
  '!followage': getFollowAge,
  '!clip': getClip,
  '!hug': giveHug,
  '!multi': multilink
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
  if (util.isMod(user)) {
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
  if (util.isMod(user)) {
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

// Get Caster Info
async function getCasterInfo(channel, user, message) {
  if (util.isMod(user)) {
    const messageArray = message.split(' ');
    if (messageArray.length >= 1) {
      let caster = messageArray[1];
      const casterInfo = await api.channelInfo(caster);
      wolvesChat.say(
        channel,
        `Check out ${casterInfo.name} over at ${
          casterInfo.URL
        } they are a great friend of the channel and we encourage you to drop them a follow! They were last playing ${
          casterInfo.lastGame
        }.`
      );
    }
  }
}

// Give Hug
function giveHug(channel, user, message) {
  let name = message.split(' ')[1],
    msg1 =
      '@' + user.username + ' embraces ' + name + ' in the warmth of the Pack',
    msg2 =
      '@' +
      user.username +
      ' tries to embrace ' +
      name +
      ' but the Alpha wolf stepped in',
    msg3 =
      name + ' is overwhelmed by the love they received from @' + user.username,
    randNum = Math.floor(Math.random() * 3);

  var messages = [msg1, msg2, msg3];

  if (name != null) {
    wolvesChat.say(channel, messages[randNum]);
  }
}

// Get Uptime
async function getUptime(channel, user, message) {
  const uptimeInfo = await api.uptime();
  wolvesChat.say(channel, uptimeInfo);
}

// Get Follow Age
async function getFollowAge(channel, user, message) {
  const followAge = await api.followage(user['user-id']);
  wolvesChat.whisper(user.username, followAge);
}

// Get Clip
async function getClip(channel, user, message) {
  const clipURL = await api.clip();
  wolvesChat.whisper(user.username, clipURL);
}

// Delete Command
function deleteCommand(channel, user, message) {
  if (user.mod) {
    let command = message.split(' ')[1];
    if (!command.toString().startsWith('!')) return;
    db.removeCommand(command, (channel, command) => {
      wolvesChat.say(channel, `Deleted command ${command} successfully!`);
    });
  }
}

// Multilink
function multilink(channel, user, message) {
  let params = message.split(' ');
  if (params.length === 1) {
    db.getCommand(message, channel, user.mod, executeCommand, commandError);
  } else {
    if (util.isMod(user)) {
      let multi = 'http://kadgar.net/live/' + config.ch;
      let partners = params.shift();
      partners.forEach(function(partner) {
        multi = multi + '/' + partner;
      });
      db.updateCommand(
        message,
        false,
        multi,
        user.username,
        config.ch,
        (channel, command) => {
          // Say stuff updated okay
          wolvesChat.say(
            channel,
            `Command ${command} was updated successfully!`
          );
        },
        user => {
          wolvesChat.whisper(user.username, 'Error adding the command');
        }
      );
      wolvesChat.say(channel, multi);
    } else {
      wolvesChat.whisper(channel, 'Only mods can change the multilink!');
    }
  }
}
