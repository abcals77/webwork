// app_mysql.js

const express = require("express")
const cors = require('cors') 

require("dotenv").config({ path : "./mysql/.env"});

const app = express(); // 인스턴스 생성
const port = 3000;


app.use(cors());


app.use(express.urlencoded({ extended: false })); 
app.use(express.json()) 

// 라우트 설정
  // 엔드포인트
app.get("/", (req, res) => {
  res.send("hello");
})
app.use("/customer", require("./routers/customer.js"))
app.use("/board", require("./routers/board.js"))
app.use("/comment", require("./routers/comment.js"))

app.listen(port, () => {
  console.log(`http://localhost:${port} 서버 실행됨`)
});