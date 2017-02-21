import mongoose from 'mongoose';
import Post from '../../../models/post';
import Message from '../../../models/message';

exports.share = (req, res) => {
  const { id } = req.params;
  const { _id } = req.decoded;

  Post.findById(id, (err, post) => {
    if(!post){
      return res.status(400).json({
        code: 0
      });
    }

    const index = post.shareRequestUser.indexOf(_id);

    if(index > -1){

    } else {
      post.shareRequestUser.push(_id);
    }

    var message = new Message();
    message.from = _id; // 누구로부터
    message.to = post.writer; // 누구에게
    message.alert = "게시글 공유 요청"
    message.what = id; // 게시글 번호
    message.save();

    post.save((err, post) => {
      res.json({
        share: post.shareRequestUser
      })
    })
  })
}


exports.permission = (req, res) => {
    const { postId, index, messageId, person } = req.params;
    const { _id } = req.decoded;

    Message.remove({ _id: messageId }, () => {
      Post.findById(postId, (err, post) => {
        const index = post.shareUser.indexOf(person);

        if(index > -1){

        } else {
          post.shareUser.push(person);
        }

        post.save((err, result) => {
          return res.json({
            result
          })
        })
      })
    })

}

exports.reject = (req, res) => {
  const { messageId } = req.params;
  Message.remove({ _id: messageId }, (err, result) => {
    return res.json({
      result
    })
  })
}
//
// exports.share = (req, res) => {
//   const { id } = req.params;
//   const { _id } = req.decoded;
//
//   if(!mongoose.Types.ObjectId.isValid(id)){
//     return res.status(400).json({
//       code: 0
//     });
//   }
//   Post.findById(id, (err, post) => {
//     let index = -1;
//
//     if(!post){
//       return res.status(400).json({
//         code: 1
//       });
//     }
//
//     for(var i in post.share){
//       if(post.share[i].shareUser == _id){
//         index = i;
//       }
//     }
//
//     if(index >= 0){
//       post.share.splice(index, 1);
//     } else {
//       const message = {
//         shareUser: _id,
//         shareBoolean: false
//       }
//       post.share.push(message);
//
//       if(_id == post.writer){
//         return res.status(200).json({
//           code: 2
//         })
//       }
//       var message = new Message();
//       message.from = _id; // 누구로부터
//       message.to = post.writer; // 누구에게
//       message.alert = "게시글 공유 요청"
//       message.what = id; // 게시글 번호
//       message.save();
//     }
//
//     post.save((err, post) => {
//       res.json({
//         user: post.share
//       })
//     })
//   })
// }
//
//
// exports.permission = (req, res) => {
//   const { postId, index, messageId } = req.params;
//   const { _id } = req.decoded;
//
//   console.log(messageId);
//   if(!mongoose.Types.ObjectId.isValid(postId)){
//     return res.status(400).json({
//       code: 1
//     });
//   }
//   Message.remove({ _id: messageId}, () => {
//     Post.findById(postId, (err, post) => {
//       const mission = post.share[index];
//
//       if(!post){
//         return res.status(400).json({
//           code: 2
//         });
//       }
//
//       Message.remove({ _id: messageId})
//
//
//       let updateData = Object.assign({}, mission, mission.shareBoolean = true);
//       post.share.splice(index, 1);
//       post.share.push(updateData)
//
//       post.save((err, post) => {
//         res.json({
//           user: post.share
//         })
//       })
//
//     })
//   })
// }
