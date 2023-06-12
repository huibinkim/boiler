const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://abc00127:rlagmlwl@7@cluster0.hcc2lq1.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  .then(() => console.log("connect"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello World!안녕");
});

app.listen(port, () => {
  console.log("Example app listening on port 3000!");
});
