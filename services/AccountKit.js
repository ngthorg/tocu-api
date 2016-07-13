const request = require('request');
const Querystring = require('querystring');
const crypto = require('crypto');

// import Guid from 'guid';
import { facebook as FacebookConfig } from '../config';


// const csrf_guid = Guid.raw();
// const apiVersion = 'v1.0';
const APPID = FacebookConfig.app_id;
const APPSECRET = FacebookConfig.app_secret;
const ME_ENDPOINT_BASE_URL = 'https://graph.accountkit.com/v1.0/me';
const TOKEN_EXCHANGE_BASE_URL = 'https://graph.accountkit.com/v1.0/access_token';

export const foo = 'foo';

export function sendcode(code) {
  return new Promise((resolve, reject) => {
    // if (csrfNonce !== csrf_guid) return reject('Something went wrong.');
    const appAccessToken = ['AA', APPID, APPSECRET].join('|');

    const params = {
      grant_type: 'authorization_code',
      code,
      access_token: appAccessToken,
    };

    // exchange tokens
    const tokenExchangeUrl = TOKEN_EXCHANGE_BASE_URL + '?' + Querystring.stringify(params);

    request.get({
      url: tokenExchangeUrl,
      json: true,
    }, (err, resp, respBody) => {
      if (err) reject(err);
      else if (respBody.error) reject(respBody.error);

      const hash = crypto.createHmac('sha256', APPSECRET)
        .update(respBody.access_token)
        .digest('hex');

      // get account details at /me endpoint
      const me_endpoint_url = ME_ENDPOINT_BASE_URL
        + '?access_token=' + respBody.access_token +
        '&appsecret_proof=' + hash;

      request.get({ url: me_endpoint_url, json: true }, (err, resp, respBody) => {
        if (err) {
          reject(err);
        } else if (respBody.error) {
          reject(respBody.error);
        }

        // if (respBody.phone) {
        //   res.phone_num = respBody.phone.number;
        // }
        // else if (respBody.email) {
        //   res.email_addr = respBody.email.address;
        // }

        resolve(respBody);
      });
    });
  });
}
