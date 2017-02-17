import jwt from 'jsonwebtoken';
import config from './config';

const secret = config.secret;

export function createJwt(payload, option){
  return new Promise(
    (resolve, reject) => {
      jwt.sign(payload, secret, option, (err, token) => {
        if(err) reject(err);
        resolve(token);
      })
    }
  )
}

export function createJwtBasic(payload, option){
  return jwt.sign(payload, secret, option);
}

// jwt.sign(payload, config.secret, option);
