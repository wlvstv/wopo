const pgp = require("pg-promise")();
const connection = {
  user: "wopo",
  host: "wlvsdb.cy36wqif1j5l.us-east-1.rds.amazonaws.com",
  database: "wlvs",
  password: "I'mgoingbacktobed",
  port: 5432
};
const db = pgp(connection);
const config = require("./devConfig.js");

exports.getCommand = (command, channel, isMod, callback, eCallback) => {
  db
    .one(
      "SELECT commands.ismod, commands.response FROM public.commands WHERE command = $1 limit 1",
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
    .none(
      "INSERT INTO public.commands(command, isMod, response, creator, channel) VALUES ($1, $2, $3, $4, $5);",
      [command, isMod, response, creator]
    )
    .then(function(data) {
      callback(data);
    })
    .catch(function(error) {
      console.log("ERROR:", error);
    });
};

exports.removeCommand = (command, callback) => {
  db
    .none("DELETE public.commands WHERE command = $1;", command)
    .then(function(data) {
      callback(data);
    })
    .catch(function(error) {
      console.log("ERROR:", error);
    });
};
