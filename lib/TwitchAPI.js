require('isomorphic-fetch');
const config = require('./config.js');
const botConfig = config.getConfigContext();
const moment  = require('moment');


exports.channelInfo = async function(channelName) {
    let endpoint = `https://api.twitch.tv/kraken/channels/${channelName}`;    
    let channelData = await outboudTwitch(endpoint,'GET');
    return {name: channelData.display_name, URL: channelData.url, lastGame: channelData.game};
  };

  exports.uptime = async function() {
      
    let endpoint = `https://api.twitch.tv/helix/streams?user_id=${botConfig.channelID}`;
    let streamData = await outboudTwitch(endpoint,'GET');
    if(streamData.data.length < 1){
        return 'Wolvesatmydoor is currently offline, check @wlvsatmydoor on twitter for updates on stream times!'
    }else
    {
        let now = moment(),
         uptime = now.diff(streamData.data[0].started_at),
         dur = moment.duration(uptime),
         msg = "Jay has been live for ";
        if(dur.hours() > 0){            
            msg = msg + `${dur.hours()} ${dur.hours()==1 ? 'hour, ' : 'hours, '}`;
        }
        if(dur.minutes() > 0){            
            msg = msg + `${dur.minutes()} ${dur.minutes()==1 ? 'minute and ' : 'minutes and '}`;
        }
        msg = msg + `${dur.seconds()} ${dur.seconds()==1 ? 'second' : 'seconds'}`;        
        return msg;
    }
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
