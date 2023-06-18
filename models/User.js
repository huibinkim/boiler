const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
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
  } else {
    //비번아니면 그냥 넘어가기
    next();
  }
});

userSchema.methods.comparePassword = function (plainPassword, callback) {
  //plainPassword 12324567를 암호화해서 비교해야한다.
  const user = this;
  bcrypt.compare(plainPassword, user.password),
    function (err, isMatch) {
      if (err) return callback(err);
      callback(null, isMatch);
    };
};

userSchema.generateToken = function (callback) {
  const user = this;
  //jsonwebtoken 이용해서 토큰생성
  const token = jwt.sign(user._id.toHexString(), 'secretToken');
  user.token = token;
  user.save(function (err, user) {
    if (err) return callback(err);
    callback(null, user);
  });
};
const User = mongoose.model('User', userSchema);

module.exports = { User };
