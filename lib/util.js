const config = require('./config.js');
const botConfig = config.getConfigContext();
//utility functions
"use strict";
//Implementation of Fisher-Yates shuffle
exports.fyShuffle = function (array) {
  let counter = array.length;
  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
  return array;
};
exports.isMod = function (user) {
  return (user.mod || user.username.toString().toLowerCase() == "decoydix" || user.username.toString().toLowerCase() == botConfig.ch.toString().toLowerCase());
}