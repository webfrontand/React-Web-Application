import mongoose from 'mongoose';
import Post from '../../../models/post';

exports.star = (req, res) => {
  const { id } = req.params;
  const { _id } = req.decoded;
  console.log(_id);
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

    const index = post.starred.indexOf(_id);

    if(index >= 0){
      post.starred.splice(index, 1);
    } else {
      post.starred.push(_id);
    }

    post.save((err, post) => {
      res.json({
        user: post.starred
      })
    })

  })
}
