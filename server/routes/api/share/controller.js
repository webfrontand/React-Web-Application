import mongoose from 'mongoose';
import Post from '../../../models/post';
import Message from '../../../models/message';

exports.share = (req, res) => {
  const { id } = req.params;
  const { _id } = req.decoded;

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(400).json({
      code: 0
    });
  }
  Post.findById(id, (err, post) => {
    let index = -1;

    if(!post){
      return res.status(400).json({
        code: 1
      });
    }

    for(var i in post.share){
      if(post.share[i].shareUser == _id){
        index = i;
      }
    }

    if(index >= 0){
      post.share.splice(index, 1);
    } else {
      const message = {
        shareUser: _id,
        shareBoolean: false
      }
      post.share.push(message);

      if(_id == post.writer){
        return res.status(200).json({
          code: 2
        })
      }
      var message = new Message();
      message.from = _id; // 누구로부터
      message.to = post.writer; // 누구에게
      message.alert = "게시글 공유 요청"

      message.save();
    }

    post.save((err, post) => {
      res.json({
        user: post.share
      })
    })
  })
}


exports.permission = (req, res) => {
  const { postId, index } = req.params;
  const { _id } = req.decoded;


  if(!mongoose.Types.ObjectId.isValid(postId)){
    return res.status(400).json({
      code: 1
    });
  }

  Post.findById(postId, (err, post) => {
    const mission = post.share[index];

    if(!post){
      return res.status(400).json({
        code: 2
      });
    }

    if(_id != post.writer){
      return res.status(400).json({
        code: 3
      });
    }

    let updateData = Object.assign({}, mission, mission.shareBoolean = true);
    post.share.splice(index, 1);
    post.share.push(updateData)

    post.save((err, post) => {
      res.json({
        user: post.share
      })
    })

  })
}
