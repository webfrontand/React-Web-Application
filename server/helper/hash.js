import bcrypt from 'bcryptjs';

exports.hashPassword = (password) => {
  return bcrypt.hashSync(password, 8)
}
