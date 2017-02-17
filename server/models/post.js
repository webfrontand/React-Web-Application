import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Post = new Schema({
  writer: String,
  title: String,
  backgroundImage: {
    type: String,
    default: 'none'
  },
  starred: [],
  urltitle: [],
  url:[],
  share: [],
  date: {
    type: String,
    default: new Date()
  }
});

export default mongoose.model('post', Post);
