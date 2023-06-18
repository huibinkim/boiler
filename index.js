const express = require('express');
// const router = express.Router();
const app = express();
const port = 5000;
const cookieParser = require('cookie-parser');
const { User } = require('./models/User'); //user가져오기
const config = require('./config/key');
app.use(express.urlencoded({ extended: true }));
//application/json 형태의 파일을 분석하여 가져올 수 있게 함.
app.use(express.json());
app.use(cookieParser());

const mongoose = require('mongoose');
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
  })
  .then(() => console.log('mongo connect'))
  .catch((err) => console.log(err));

app.get('/', (req, res) => res.send('hello'));
app.post('/register', (req, res) => {
  const user = new User(req.body);
  user.save((err, userInfo) => {
    if (err) return res.json({ sucess: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});
app.post('/login', (req, res) => {
  //요청된 이메일을 데이터베이스에서 있는지 확인
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSucess: false,
        message: '이메일에 해당하는 유저가 없다.',
      });
    }
    //요청된 이메일이 데이터베이스에 있다면 비번이 맞는지 확인
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({ loginSucess: false, message: '비번이 틀렸다.' });

      //비번까지 맞다면 토큰 생성하기
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);

        //토큰 저장. 어디? 쿠키,로컬스토리지 등 내맘대로
        res
          .cookie('x-auth', user.token)
          .status(200)
          .json({ loginSucess: true, userId: user._id });
      });
    });
  });
});
app.listen(port, () => {
  console.log('Example app listening on port 5000!');
});
