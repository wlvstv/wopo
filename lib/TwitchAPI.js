require('isomorphic-fetch');
const config = require('./config.js');
const botConfig = config.getConfigContext();


exports.channelInfo = async function(channelName) {
    let endpoint = `https://api.twitch.tv/kraken/channels/${channelName}`;    
    var channelData = await outboudTwitch(endpoint,'GET');
    return {name: channelData.display_name, URL: channelData.url, lastGame: channelData.game};
  };

  async function outboudTwitch(endpoint, _method) {
    const resp = await fetch(endpoint, {method:_method, headers:{'Client-ID': botConfig.twitchCID}})
      .then(res => {
        if (res.status >= 400) {
          throw new Error('Bad Server Request');
        }
        return res.json();
      })
      .catch(err => {
        console.log(err);
      });
    return resp;
  }
