const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
// const myPlaintextPassword = 's0//P4$$w0rD';
// const someOtherPlaintextPassword = 'not_bacon';
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      maxlength: 10,
    },
    email: {
      type: String,
      trim: true,
      unique: 1,
    },
    password: {
      type: String,
      minlength: 5,
    },
    lastname: {
      type: String,
      maxlength: 50,
    },
    role: {
      type: Number,
      default: 0,
    },
    image: String,
    token: {
      type: String,
    },
    tokenExp: {
      type: Number,
    },
  },
  { collection: 'mongoose-user' }
);
userSchema.pre('save', function (next) {
  const user = this;
  //비번 암호화하기
  if (user.isModified('password')) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, function (err, hash) {
        // Store hash in your password DB.
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  }
});
const User = mongoose.model('User', userSchema);

module.exports = { User };
