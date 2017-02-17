import User from '../../../models/user';
import jwt from 'jsonwebtoken';
import { createJwt, createJwtBasic } from '../../../helper/jwt';
/*
POST / api/auth/register
BODY : {
  email,
  password,
  username
}
ERROR CODES:
  0: 이메일, 패스워드, 유저네임 필수 입력
  1: 잘못된 이메일 형식
  2: 잘못된 비밀번호 형식
  3: 이미 존재하는 이메일
  4: 이미 존재하는 유저네임
*/
exports.register = (req, res) => {
    const { email, password, username } = req.body;
    const regEmail = /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

    if(!email || !password || !username){
      return res.status(400).json({
        code: 0
      });
    }

    if(!regEmail.test(email)){
      return res.status(400).json({
        code: 1
      });
    }

    if(!password || password.length < 4 || typeof password !== "string"){
      return res.status(400).json({
        code: 2
      });
    }
    User.findOneEmail(email).
    then(result => {
      if(result) {
        throw new Error(3)
      } else {
        return User.findOneUsername(username)
      }
    }).then(result => {
      if(result) {
        throw new Error(4)
      } else {
        return User.create(email, password, username);
      }
    }).then((result) => {

      let payload = {
        _id: result._id,
        username: result.common_profile.username,
        admin: result.common_profile.admin,
        thumbnail: result.common_profile.thumbnail,
        email: result.common_profile.email
      };

      let option = {
        expiresIn: '7d',
        issuer: 'issuer',
        subject: 'userInfo'
      };
      const token = createJwtBasic(payload, option);
      res.json({token});
    }).catch(error => {
      res.status(409).json({
        code: error.message
      });
    });
}

/*
POST / api/auth/login
BODY : {
  email,
  password
}
ERROR CODES:
  0: 잘못된 이메일 형식
  1: 이메일 혹은 비밀번호 필수 입력
  2: 등록되지 않은 이메일
  3: 비밀번호가 틀립니다
*/
exports.login = (req, res) => {
  const { email, password } = req.body;
  const regEmail = /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
  const secret = req.app.get('jwt-secret');

  if(!regEmail.test(email)){
    return res.status(400).json({
      code: 0
    });
  }

  if(!email || !password){
    return res.status(400).json({
      code: 1
    });
  }

  User.findOneEmail(email)
  .then(result => {
    if(!result){
      throw new Error(2)
    } else {
      if(result.verify(password)){

      let payload = {
        _id: result._id,
        username: result.common_profile.username,
        admin: result.common_profile.admin,
        thumbnail: result.common_profile.thumbnail,
        email: result.common_profile.email
      };

      let option = {
        expiresIn: '7d',
        issuer: 'issuer',
        subject: 'userInfo'
      };

      const p = createJwt(payload, option);
      return p;
      } else {
        throw new Error(3);
      }
    }
  }).then(decoded => {

    jwt.verify(decoded, secret, (err, userinfo) => {
      res.json({
        message: 'success',
        decoded,
        userinfo
      })
    })
  }).catch(error => {
    res.status(403).json({
      code: error.message
    })
  })
}

exports.token = (req, res) => {
  res.json({
    userinfo: req.decoded
  })
}


exports.put = (req, res) => {
  const { email, thumbnailName } = req.body;

  User.findOneEmail(email).
  then((result) => {
    if(!result) {
      throw new Error(0)
    } else {
      result.common_profile.thumbnail = thumbnailName;

      result.save((err, result) => {
        res.status(200).json({
          result
        })
      })
    }
  }).catch((error) => {
    res.status(403).json({
      code: error.message
    })
  })
}
