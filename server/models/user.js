import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import hash  from '../helper/hash';

const Schema = mongoose.Schema;

const User = new Schema({
    password: String,
    common_profile: {
      username: String,
      gender: {
        type:String
      },
      email: String,
      thumbnail: {
        type: String,
        default: 'none'
      },
      admin: {
        type: Boolean,
        default: false
      }
    }
});

User.statics.create = function(email, password, username){
    const hashPassword = hash.hashPassword(password);
    const user = new this({
      'common_profile.email': email,
      'password': hashPassword,
      'common_profile.username': username
    });
    return user.save();
}
User.statics.findOneEmail = function(email){
    return this.findOne({ 'common_profile.email': email }).exec();
}

User.statics.findOneUsername = function(username){
    return this.findOne({ 'common_profile.username': username }).exec();
}

User.methods.verify = function(password) {
    return bcrypt.compareSync(password, this.password);
};

export default mongoose.model('user', User);
