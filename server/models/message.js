import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Message = new Schema({
  from: {
    type: String
  },
  to: {
    type: String
  },
  alert: {
    type: String
  },
  date: {
    type: String,
    default: new Date()
  }

});

export default mongoose.model('message', Message);
