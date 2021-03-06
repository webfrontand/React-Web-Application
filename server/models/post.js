import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Post = new Schema({
  writer: String,
  username: String,
  title: String,
  article: String,
  starred: [],
  shareRequestUser: [],
  shareUser: [],
  date: {
    type: String,
    default: new Date()
  }
});

export default mongoose.model('post', Post);
