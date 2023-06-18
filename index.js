const express = require('express');
// const router = express.Router();
const app = express();
const port = 5000;
const { User } = require('./models/User'); //user가져오기
app.use(express.urlencoded({ extended: true }));
//application/json 형태의 파일을 분석하여 가져올 수 있게 함.
app.use(express.json());

const mongoose = require('mongoose');
mongoose
  .connect(
    'mongodb+srv://abc00127:rlagmlwl7@cluster0.hcc2lq1.mongodb.net/?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
    }
  )
  .then(() => console.log('mongo connect'))
  .catch((err) => console.log(err));

// connect();

// const registerUser = async (req, res) => {
//   try {
//     const user = new User(req.body);
//     const userStatus = await user.save();

//     if (!userStatus) {
//       const err = new Error('실패');
//       res.status(400).json({ success: fail, err });
//     }
//     res.status(200).json({ success: true });
//     console.log(userStatus);
//   } catch (err) {
//     res.status(500).send(err);
//     console.log(err);
//   }
// };

app.get('/', (req, res) => res.send('hello woolr'));
app.post('/register', (req, res) => {
  const user = new User(req.body);
  user.save((err, userInfo) => {
    if (err) return res.json({ sucess: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});
// // 회원가입 페이지로 이동
// router.get('/', (req, res) => {
//   res.render('register');
// });
// // 회원가입
// router.post('/', registerUser);

app.listen(port, () => {
  console.log('Example app listening on port 5000!');
});
