/*
 * Spotify's Authorization guide:
 https://developer.spotify.com/documentation/general/guides/authorization-guide/#authorization-code-flow
 */

const request = require("request")
const config = require('./config.js');
const botConfig = config.getConfigContext();

const {client_id, client_secret, redirect_uri, refresh_token} = botConfig.spotifyCredentials 

const scopes = 'user-read-currently-playing'

/*
 * Use this url to retrieve a authorization code,
 * Use the authorization code to retrieve a access token and refresh token
 * The refresh token will need to be stored, it's used to generate access tokens
 */
const authorizeURL = `https://accounts.spotify.com/authorize/?client_id=${client_id}&response_type=code&redirect_uri=${redirect_uri}&scope=user-read-currently-playing`

let access_token = ''

// 'code' property is returned from calling a GET on the authorizeURL
async function getAccessToken() {
  const _options = { 
    method: 'POST',
    url: 'https://accounts.spotify.com/api/token',
    headers: 
    { 'Content-Type': 'application/x-www-form-urlencoded' },
    form: { 
      client_id,
      client_secret,
      redirect_uri,
      grant_type: 'authorization_code',
      code,
    } 
  }

  request(_options, (error, response, body) => {
    if (error) throw new Error(error)
    if (body) {
      const _body = JSON.parse(body)
      access_token = _body.access_token
      refresh_token = _body.refresh_token
      console.log('SpotifyAPI: Access & Refresh Token Set')
      return _body
    }
  })
}

function getRefreshToken() {
  const _options = { 
    method: 'POST',
    url: 'https://accounts.spotify.com/api/token',
    headers: { 
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    form: { 
      client_id,
      client_secret, 
      grant_type: 'refresh_token',
      refresh_token,
    } 
  }
  return new Promise((resolve, reject) => {
    request(_options, (error, response, body) => {
      if (error) {
        reject(error)
      }
      else {
        const _body = JSON.parse(body)
        console.log('SpotifyAPI: Refreshed & Set Access Token')
        access_token = _body.access_token
        resolve(_body.access_token)
      }
    })
  })
}

async function getNowPlaying(token) {
  const songInfo = await fetch(
    'https://api.spotify.com/v1/me/player/currently-playing', 
    {
      method:'get', 
      headers:{
        Authorization: `Bearer ${token}`
      }
    })
  .then(response => {
    if (response.status >= 400) {
      console.log(response.status ,response.statusText)
    }
    return response.json()
  }).catch(error => {
    console.log(error)
  })
  return {
    url: songInfo.item.external_urls.spotify,
    name: songInfo.item.name,
    artist: songInfo.item.artists[0].name
  }
}

module.exports = {
  async refreshToken() {
    return await getRefreshToken()
  },
  async accessToken() {
    return await getAccessToken()
  },
  async nowPlaying() {
    const _accessToken = await getRefreshToken()
    return getNowPlaying(_accessToken)
  }
}