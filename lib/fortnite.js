// var request = require('request');
require('isomorphic-fetch');

exports.totalWins = async function() {
  // Call Api
  const apiData = await callApl();

  // Get lifetime stats array, and call search command to find Wins
  // key to determin number of total wins
  var ltStats = apiData.lifeTimeStats;
  var totalWins = searchLtStats(ltStats, 'Wins');
  return totalWins;
};

exports.getStats = async function(message) {
  // call api
  var apiData = await callApl();
  //read message
  var callStat = message.split(' ')[1].toUpperCase();

  // get different stats based on callStat
  switch (callStat) {
    case 'SOLO':
      //api json all time solo = p2
      return { mode: 'solo', data: apiData.stats.p2.top1.displayValue };
      break;
    case 'DUOS':
      //api json all time duos = p10
      return { mode: 'duo', data: apiData.stats.p10.top1.displayValue };
      break;
    case 'SQUAD':
      // api json all time Squads = p9
      return { mode: 'squad', data: apiData.stats.p9.top1.displayValue };
      break;
    case 'WINS':
      //Get LT stats array and search it for total wins
      return {
        mode: 'total',
        data: searchLtStats(apiData.lifeTimeStats, 'Wins')
      };
      break;
    default:
      // return the instructions for submitting a fortnite stat call
      return {
        data:
          'Stat Search Format: !fortnite <STAT>. Get stat for SOLO wins, DUOS wins, SQUAD wins, and total WINS'
      };
  }
};

// Helper functions and config
var apiUrl = 'https://api.fortnitetracker.com/v1/profile/pc/wolvesatmydoor';

const fetchOptions = {
  method: 'GET',
  headers: {
    'TRN-api-key': '6f327bfc-a708-43ca-a5e0-a0b574460088'
  }
};

async function callApl() {
  const response = await fetch(apiUrl, fetchOptions)
    .then(res => {
      if (res.status >= 400) {
        throw new Error('Bad Server Request');
      }
      return res.json();
    })
    .catch(err => {
      console.log(err);
    });
  return response;
}

function searchLtStats(array, key) {
  for (i = 0; i <= array.length; i++) {
    if (array[i].key === key) {
      return array[i].value;
    }
  }
}
