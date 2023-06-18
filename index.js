const express = require('express');
// const router = express.Router();
const app = express();
const port = 5000;
const { User } = require('./models/User'); //user가져오기
const config = require('./config/key');
app.use(express.urlencoded({ extended: true }));
//application/json 형태의 파일을 분석하여 가져올 수 있게 함.
app.use(express.json());

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

app.listen(port, () => {
  console.log('Example app listening on port 5000!');
});
