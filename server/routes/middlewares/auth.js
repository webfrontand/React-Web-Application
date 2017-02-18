import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const token = req.headers['x-access-token'] || req.query.token;

  if(!token){
    console.log('no token!');
    return res.status(400).json({
      code: 0
    });
  }

  const p = new Promise(
    (resolve, reject) => {
      jwt.verify(token, req.app.get('jwt-secret'), (err, decoded) => {
        if(err) reject(err);
        resolve(decoded);
      })
    }
  )

  p.then(decoded => {
    req.decoded = decoded;
    next();
  }).catch(error => {
    res.status(400).json({
      code: 0
    });
  })
}

export default authMiddleware;
