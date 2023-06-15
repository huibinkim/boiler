const express = require("express");
const app = express();
const port = 3000;
const username = encodeURIComponent("abc00127");
const password = encodeURIComponent("rlagmlwl@7");
// const bodyParser = require("body-parser");
const { User } = require("./models/User"); //user가져오기
//application/x-www-form-urlencoded 를 분석하여 가져옴
app.use(express.urlencoded({ extended: true }));
//application/json 형태의 파일을 분석하여 가져올 수 있게 함.
app.use(express.json());

const mongoose = require("mongoose");
mongoose
  .connect(
    `mongodb+srv://${username}:${password}@cluster0.hcc2lq1.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => console.log("connect"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => res.send("Hello World!"));
app.post("/register", (req, res) => {
  //회원 가입 할때 필요한 정보를 client에서 가져오면 그것들을 데이터베이스에 넣어준다.
  const user = new User(req.body);
  console.log(user.name);
  console.log(user.email);
  //body-parser가 있기 때문에 User안의 req.body의 내용을 객체로 가져올 수 있다.
  user.save((err) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

app.listen(port, () => {
  console.log("Example app listening on port 3000!");
});
