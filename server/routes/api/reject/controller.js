import Post from '../../../models/post';
import Message from '../../../models/message';
import mongoose from 'mongoose';


exports.reject = (req, res) => {
  const { what, from, messageid } = req.params;
  Message.remove({ _id: messageid }, () => {
    Post.findById(what).exec((err, post) => {
      let index = post.shareRequestUser.indexOf(from);

      if(index > -1){
        post.shareRequestUser.splice(index, 1);
      } else {
        return res.status(400).json({
          message: "잘못된 요청입니다"
        });
      }

      var message = new Message();
      message.from = "system"; // 누구로부터
      message.to = from; // 누구에게
      message.alert = "정상적인 취소 요청 완료"
      message.save();

      post.save((err, result) => {
        return res.status(200).json({
          result
        })
      })
    })
  })

}
