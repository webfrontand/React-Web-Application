import User from '../../../models/user';
import hash from '../../../helper/hash';

exports.info = (req,res) => {
  const { _id } = req.decoded;

  User.findOne({ _id }).then(
    (user) => {
      res.json({user});
    }
  )
}


exports.unregister = (req, res) => {
  const { _id } = req.decoded;

  User.remove({ _id }).then(
    (user) => {
      res.json({user});
    }
  )
}


/*
POST / api/user/update
BODY : {
  username,
  password
}
ERROR CODES:
  0: 유저네임과 패스워드 필수입력
  1: 이미 존재하는 유저네임
*/

exports.update = (req, res) => {
  const { _id } = req.decoded;
  const { username, password } = req.body;

  if(!username || !password){
    return res.status(400).json({
      code: 0
    });
  }

  User.findOneUsername(username).then(
    (result) => {
      if(result){
        throw new Error(1);
      } else {
        const p = new Promise((resolve, reject) => {
          User.findOne({_id}).exec((err, user) => {
            console.log(_id);
            if(err) reject(err);
            resolve(user);
          })
        });
        return p;
      }
    }).then((result) => {
      result.common_profile.username = username;
      result.password = hash.hashPassword(password);
      result.save((err, result) => {
        res.status(200).json({
          result
        })
      })
    }).catch((error) => {
      res.status(403).json({
        code: error.message
      })
    })
}

exports.admin = (req, res) => {

  if(req.decoded.admin){
    return res.status(200).json({
      message: "관리자 전용 페이지"
    })
  } else {
    return res.status(400).json({
      message: "허용하지 않은 접근"
    })
  }
}
