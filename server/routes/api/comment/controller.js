import mongoose from 'mongoose';
import Post from '../../../models/post';
import Comment from '../../../models/comment';


exports.moreread = (req, res) => {
  const { postId, lastId } = req.params;

  Post.findById(postId, (err, post) => {
    if(!post){
      return res.status(400).json({
        code: 0
      })
    }

    Comment.find({
      postId,
      _id: { $lt: lastId }
    }).sort({ _id: -1 }).limit(3).exec((err, result) => {
      return res.status(200).json({
        result
      })
    })
  })
}
exports.read = (req, res) => {
  const { _id } = req.decoded;
  const { postId } = req.params;

  if(!mongoose.Types.ObjectId.isValid(postId)){
    return res.status(400).json({
      code: 0
    });
  }

  Post.findById(postId, (err, post) => {
    if(!post){
      return res.status(400).json({
        code: 1
      });
    }

    Comment.find({ postId }).limit(5).sort({_id: -1}).exec((err, result) => {
      return res.json({
        result
      });
    });
  });
}

exports.writer = (req, res) => {
  const { _id, username, thumbnail } = req.decoded;
  const { postId } = req.params;
  const { article } = req.body;

  if(!mongoose.Types.ObjectId.isValid(postId)){
    return res.status(400).json({
      code: 0
    });
  }

  if(!article){
    return res.status(400).json({
      code: 1
    })
  }
  Post.findById(postId, (err, post) => {
    if(!post){
      return res.status(400).json({
        code: 2
      });
    }

    const comment = new Comment({
      postId,
      writer: _id,
      article,
      username,
      thumbnail
    });

    comment.save((err, result) => {
      res.status(200).json({
        result
      })
    })
  })
}

exports.delete = (req, res) => {
  const { _id } = req.decoded;
  const { id } = req.params;

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(400).json({
      code: 0
    })
  }

  Comment.findById(id, (err, comment) => {
    if(!comment){
      return res.status(400).json({
        code: 1
      })
    }


    Comment.remove({ _id: id }, (err, result) => {
      res.json({
        result
      })
    })
  })
}

exports.update = (req, res) => {
  const { id } = req.params;
  const { _id } = req.decoded;
  const { article } = req.body;

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(400).json({
      code: 0
    })
  }

  if(!article){
    return res.status(400).json({
      code: 1
    })
  }

  Comment.findById(id, (err, comment) => {
    if(!comment){
      return res.status(400).json({
        code: 2
      })
    }

    comment.article = article;

    comment.save((err, result) => {
      res.status(200).json({
        result
      });
    });
  })


}
