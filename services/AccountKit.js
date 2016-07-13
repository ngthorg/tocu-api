// import Guid from 'guid';
import { facebook } from '../config';
const Axios = require('axios');
const crypto = require('crypto');


// const csrf_guid = Guid.raw();
// const apiVersion = 'v1.0';
const APPID = facebook.app_id;
const APPSECRET = facebook.app_secret;
const ME_ENDPOINT_BASE_URL = 'https://graph.accountkit.com/v1.0/me';
const TOKEN_EXCHANGE_BASE_URL = 'https://graph.accountkit.com/v1.0/access_token';

export const foo = 'foo';

export function sendcode(code) {
  const appAccessToken = ['AA', APPID, APPSECRET].join('|');

  return Axios.get(TOKEN_EXCHANGE_BASE_URL, {
    params: {
      grant_type: 'authorization_code',
      code,
      access_token: appAccessToken,
    },
  }).then(respBody => {
    const hash = crypto.createHmac('sha256', APPSECRET)
      .update(respBody.access_token)
      .digest('hex');

    return Axios.get(ME_ENDPOINT_BASE_URL, {
      params: {
        access_token: respBody.access_token,
        appsecret_proof: hash,
      },
    }).then(res => res)
    .catch(err => {
      throw err.data.error;
    });
  })
  .catch(err => {
    throw err.data.error;
  });
}
