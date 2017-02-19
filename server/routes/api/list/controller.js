import Post from '../../../models/post';
import mongoose from 'mongoose';

exports.list = (req, res) => {
  Post.find().sort({_id: -1}).limit(10).exec((err, result) => {
    res.json({result})
  })
}

exports.listdetail = (req, res) => {

  const id = req.params.id;
  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(400).json({
      code: 0
    });
  }

  Post.findById(id, (err, result) => {
    if(!result){
      return res.status(400).json({
        code: 1
      });
    }
    res.json({
      result
    })
  })
}

exports.addlist = (req, res) => {
  const id = req.params.id;

  Post.find({ _id: { $lt: id } }).sort({_id: -1}).limit(5).exec((ecc, result) => {
    return res.status(200).json({
      result
    })
  })
}
