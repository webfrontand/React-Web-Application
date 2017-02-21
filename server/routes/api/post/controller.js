import Post from '../../../models/post';
import mongoose from 'mongoose';

/*
POST / api/post
BODY : {
  writer,
  title,
  backgroundImage,
  list
}
ERROR CODES:
  0: 타이틀과 리스트 필수 입력
*/
exports.writer = (req, res) => {
  const { title, article, username } = req.body;
  const { _id } = req.decoded;

  if(!title || !article || !username){
    return res.status(400).json({
      code: 0
    });
  }

  const post = new Post({
    writer: _id,
    title,
    article,
    username
  });

  post.save((err, result) => {
    if(err) throw err;
    res.status(200).json(result)
  })
}
/*
DELETE / api/post

ERROR CODES:
  0: 잘못된 mongoose id
  1: 유효하지 않는 포스트
  2: 로그인된 사용자와 글 작성자가 동일하지 않는다.
*/
exports.delete = (req, res) => {
  const { _id } = req.decoded;
  const { id } = req.params;

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(400).json({
      code: 0
    });
  }

  Post.findById(id, (err, post) => {
    if(!post) {
      return res.status(400).json({
        code: 1
      });
    }

    if(_id != post.writer){
      return res.status(400).json({
        code: 2
      });
    }

    Post.remove({ _id: id}, (err, result) => {
      if(err) throw err;
      res.json({
        result
      })
    })
  })
}

exports.update = (req,res) => {
  const { _id } = req.decoded;
  const { id } = req.params;
  const { title, article } = req.body;

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(400).json({
      code: 0
    });
  }

  if(!title || !article){
    return res.status(400).json({
      code: 1
    });
  }

  Post.findById(id, (err, post) => {
    if(!post) {
      return res.status(400).json({
        code: 2
      });
    }


    // if(_id != post.writer){
    //   return res.status(400).json({
    //     code: 3
    //   });
    // }

    post.title = title;
    post.article = article;

    post.save((err, result) => {
      res.status(200).json({
        result
      })
    })
  })
}
