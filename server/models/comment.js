import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Comment = new Schema({
  postId: {
    type: String
  },
  writer: {
    type: String
  },
  article: {
    type: String
  }
});

export default mongoose.model('comment', Comment);
