// Configuration
const pgp = require('pg-promise')();
const connection = {
  user: 'wopo',
  host: 'wlvsdb.cy36wqif1j5l.us-east-1.rds.amazonaws.com',
  database: 'wlvs',
  password: "I'mgoingbacktobed",
  port: 5432
};
const db = pgp(connection);
const config = require('./devConfig.js');

//#region CREATE
exports.newCommand = (
  command,
  isMod,
  response,
  creator,
  channel,
  callback,
  eCallback
) => {
  db
    .one(
      'SELECT commands.ismod, commands.response FROM public.commands WHERE command = $1 limit 1',
      command
    )
    .then(function(commandInfo) {
      db
        .none(
          'INSERT INTO public.commands(command, isMod, response, creator, channel) VALUES ($1, $2, $3, $4, $5);',
          [command, isMod, response, creator, channel]
        )
        .then(function(data) {
          callback(data);
        })
        .catch(function(error) {
          console.log('ERROR:', error);
        });
    })
    .catch(function(error) {
      eCallback(command, creator, error);
    });
};
//#endregion

//#region READ
exports.getCommand = (command, channel, isMod, callback, eCallback) => {
  db
    .one(
      'SELECT commands.ismod, commands.response FROM public.commands WHERE command = $1 limit 1',
      command
    )
    .then(function(commandInfo) {
      if (commandInfo.ismod) {
        if (isMod) {
          callback(config.ch, commandInfo.response);
        }
      } else {
        callback(config.ch, commandInfo.response);
      }
    })
    .catch(function(error) {
      eCallback(command, error);
    });
};
//#endregion

exports.checkCommand = (command, channel) =>{
 return getCommand(command, channel, true, ()=>{return true;}, ()=>{return false;});
}

//#region UPDATE
exports.updateCommand = (
  command,
  isMod,
  response,
  creator,
  channel,
  callback,
  eCallback
) => {
  db
    .none(
      'UPDATE public.commands SET command = $1, isMod = $2, response = $3, creator = $4, channel = $5 WHERE command = $1',
      [command, isMod, response, creator, channel]
    )
    .then(() => {
      if (isMod) {
        callback(config.ch, command);
      } else {
        callback(config.ch, command);
      }
    })
    .catch(err => {
      console.log('Error: ', err);
      eCallback(creator);
    });
};
//#endregion

//#region DELETE
exports.removeCommand = (command, callback) => {
  db
    .none('DELETE public.commands WHERE command = $1;', command)
    .then(function(data) {
      callback(data);
    })
    .catch(function(error) {
      console.log('ERROR:', error);
    });
};
//#endregion
