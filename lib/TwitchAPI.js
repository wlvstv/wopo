require('isomorphic-fetch');
const config = require('./config.js');
const botConfig = config.getConfigContext();
const moment  = require('moment');

let tokenExpiry = moment(),
liveToken = null;


exports.channelInfo = async function(channelName) {
    let endpoint = `https://api.twitch.tv/kraken/channels/${channelName}`;    
    let channelData = await openTwitch(endpoint,'GET');
    return {name: channelData.display_name, URL: channelData.url, lastGame: channelData.game};
  };

  exports.uptime = async function() {      
    let endpoint = `https://api.twitch.tv/helix/streams?user_id=${botConfig.channelID}`;
    let streamData = await openTwitch(endpoint,'GET');
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

  exports.followage = async function(userID) {
    let endpoint = `https://api.twitch.tv/helix/users/follows?from_id=${userID}&to_id=${botConfig.channelID}`,
     userData = await openTwitch(endpoint, 'GET');
    if(userData.data.length > 0){

     let followtime = userData.data[0].followed_at,
     follow_duration = moment.duration(moment().diff(followtime)),
     detail = `Years: ${follow_duration.years()} Months: ${follow_duration.months()} Days: ${follow_duration.days()}`,
     msg = 'You have been following wolvesatmydoor for ';
     if(follow_duration.years() > 0){            
         msg = msg + `${follow_duration.years()} ${follow_duration.hours()==1 ? 'year, ' : 'years, '}`;
     }
     if(follow_duration.months() > 0){            
         msg = msg + `${follow_duration.months()} ${follow_duration.months()==1 ? 'month and ' : 'months and '}`;
     }
     msg = msg + `${follow_duration.days()} ${follow_duration.days()==1 ? 'day' : 'days'} (${moment(followtime).format("dddd, MMMM Do YYYY, h:mm:ss a")})`;
     if(follow_duration.years() < 1 && follow_duration.months() < 1 && follow_duration.days() < 1){
       msg = 'You have been following wolvesatmydoor for less than a day, welcome to the community! Make sure to follow @wlvsatmydoor on twitter for stream updates!'
     }
     
     return msg; 
    }else {
      return "According to Twitch, you're not following yet. Make sure you do :)"; 
    }    
  }
  async function openTwitch(endpoint, _method) {
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

  async function authorizedTwitch(endpoint, _method) {
    if(liveToken === null || moment().diff(tokenExpiry, 'seconds') > 1){
      const newToken = await getToken();
      liveToken = newToken.access_token;
      tokenExpiry = moment().add(newToken.expires_in,'s');
      const resp = await fetch(endpoint, {method:_method, headers:{'Authorization': `Bearer ${liveToken}`}})
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
    }else {
      const resp = await fetch(endpoint, {method:_method, headers:{'Authorization': `Bearer ${liveToken}`}})
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
  }

  async function getToken(endpoint, payload, method) {
    if(liveToken === null || moment().diff(tokenExpiry, 'seconds') > 1){     
      const tokenResponse = await fetch(`https://id.twitch.tv/oauth2/token?client_id=${botConfig.apiClientID}&client_secret=${botConfig.clientSecret}&grant_type=client_credentials&scope=bits:read+clips:edit`,
      {method:'POST', headers:{'Client-ID': botConfig.twitchCID}}).then(res => {          
          return(res.json());
        })
        .catch(err => {
          console.log(err);
        });
        return tokenResponse;
    }
  }
