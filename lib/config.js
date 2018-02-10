//Security utility functions!
'use strict';
//Get the security context (test v. prod)

let isDev = checkDev();

exports.getConfigContext = function() {
  try {
    return require('./prodConfig.js');
  } catch (e) {}
  return require('./devConfig.js');
};

exports.isDev = isDev;

function checkDev() {
  try {
    require('./prodConfig.js');
    return false;
  } catch (e) {}
  return true;
}
