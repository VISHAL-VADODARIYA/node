const express = require("express");
const routerPost = require("./routes/posts");
const routerUser = require("./routes/users");
const app = express();


app.use('/post',routerPost)
app.use('/user',routerUser)

app.get("/", (req, res) => {
  res.send("<h1>hello</h1>");
});


app.listen(4002,()=>console.log('connected'))