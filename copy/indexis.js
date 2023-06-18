const express = require('express');
const router = express.Router();
const app = express();
const port = process.env.PORT || 3000;
const username = encodeURIComponent('abc00127');
const password = encodeURIComponent('rlagmlwl@7');
// const bodyParser = require("body-parser");
const { User } = require('./models/User'); //user가져오기
//application/x-www-form-urlencoded 를 분석하여 가져옴
app.use(express.urlencoded({ extended: true }));
//application/json 형태의 파일을 분석하여 가져올 수 있게 함.
app.use(express.json());

const mongoose = require('mongoose');
const MONGO_URL = `mongodb+srv://${username}:${password}@cluster0.hcc2lq1.mongodb.net/?retryWrites=true&w=majority`;

const connect = async () => {
  try {
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
    });
    console.log('MongoDB Connected');

    mongoose.connection.on('error', (err) => {
      console.error('Mongo DB connect ERROR', err);
    });

    mongoose.connection.addListener('disconnected', () => {
      console.log('몽고 디비 연결이 끊어졌습니다. 연결을 재시도 합니다.');
    });
  } catch (err) {
    console.log(err);
  }
};
connect();
// const registerUser = (req, res) => {
//   try {
//     const user = new User(req.body);
//     user
//       .save()
//       .then(() => {
//         res.status(200).json({ success: true });
//       })
//       .catch((err) => {
//         return res.json({ success: false, err });
//       });
//   } catch (err) {
//     console.log(err);
//   }
// };
const registerUser = async (req, res) => {
  try {
    const user = new User(req.body);
    const userStatus = await user.save();

    if (!userStatus) {
      const err = new Error('실패');
      res.status(400).json({ success: fail, err });
    }
    res.status(200).json({ success: true });
    console.log(userStatus);
  } catch (err) {
    res.status(500).send(err);
    console.log(err);
  }
};
// 회원가입 페이지로 이동
router.get('/', (req, res) => {
  res.render('register');
});
// 회원가입
router.post('/', registerUser);

app.listen(port, () => {
  console.log('Example app listening on port 3000!');
});
