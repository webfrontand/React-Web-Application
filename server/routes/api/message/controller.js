import mongoose from 'mongoose';
import Message from '../../../models/message';


exports.list = (req,res) => {
  const { _id } = req.decoded;

  Message.find({}).exec((err, result) => {
    return res.json({
      result
    });
  })
}


exports.receive = (req, res) => {
  const { _id } = req.decoded;
  const { id } = req.params;

  Message.find({ 'to': id }).exec((err, result) => {
    return res.json({
      result
    })
  })
}

exports.send = (req, res) => {
  const { _id } = req.decoded;
  const { id } = req.params;

  Message.find({ 'from': id }).exec((err, result) => {
    return res.json({
      result
    })
  })
}
