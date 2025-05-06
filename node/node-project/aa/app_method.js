const express = require('express')

const multer  = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'c:/temp/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})

const upload = multer({ storage: storage })
                      
// express instance 생성
const app = express()
const port = 80

app.use(express.urlencoded({ extended: false })); 
app.use(express.json()) 

let boards = [
  {id:1, title:"제목1", content:"내용1"},
  {id:2, title:"제목2", content:"내용2"},
  {id:3, title:"제목3", content:"내용3"},
  {id:4, title:"제목4", content:"내용4"},
  {id:5, title:"제목5", content:"내용5"},
  {id:6, title:"제목6", content:"내용6"}
] // id, title, content

// 로그 미들웨어 morgan
const morgan = require('morgan');
app.use(morgan('[:date[iso]] :method :url :remote-addr'))

app.get('/download', (req, res, next) => {
  const filepath = 'c:/temp/uploads/img.jpg';  
  const downname = express.urlencoded('img.jpg');
  res.setHeader('Content-Type', 'text/plain')  
  res.setHeader('Content-Disposition', `attachment; filename=${downname}`); // 이게 핵심 
  res.sendFile(filepath);
});  


app.post('/profile', upload.single('avatar'), function (req, res) {
  console.log(req.file.size)
  console.log(req.file.filename)
  console.log(req.file.originalname)
  res.send("OK")
})

// 라우트 설정
app.get('/', (req, res) => {
  res.send("hello");
})
// 전체 조회
app.get('/board', (req, res) => {
  res.send(boards);
})

// 단건 조회


// 등록
app.post('/board', (req, res) => {
  const board = req.body; // == java(VO) 
  boards.push(board)
  console.log("받은 파라미터", board);
  res.send(board);
})


// 수정
app.put('/board/:id', (req, res) => {
  const id = req.params.id
  const board = req.body; // jsonm form-data
  
  // find -> idx
  const idx = boards.findIndex( ele => ele.id == id);
  if(idx >= 0){
    boards[idx] = board;
    res.send(board)
  } else {
    res.send("not find")
  }


})

// 삭제
app.put('/board/:id', (req, res) => {
  const id = req.params.id
  const idx = boards.findIndex( ele => ele.id == id);
  if(idx >= 0){
    boards.splice(idx,1);
    res.send(boards)
  } else {
    res.send("not find")
  }  
})

// 삭제 (filter 사용)
/*app.put('/board/:id', (req, res) => {
  const id = req.params.id
  const idx = boards.findIndex( ele => ele.id == id);
  if(idx >= 0){
    boards = boards.filter( ele => ele.id == id); => 필터로 찾은 값을 원래 배열에 다시 배치
    res.send(boards)
  } else {
    res.send("not find")
  }  
})*/

let emps = [
  {name:"길동"},
  {name:"순신"}
]
// route() 같은 리소스(url) method 타입별로 묶어서 라우트 지정
app.route("/emp")
  // 전체 조회
  .get((req, res) =>{res.send(emps)})
  // 단건 조회
  // .get((req, res) =>{res.send(emps[req.query.id])})
  .post((req, res) => {res.send(req.body)})
  .put((req, res) =>{res.send(req.body)})
  .delete((req, res) =>{res.send(req.body.id)})

// Ruter를 이용하여 모듈(파일) 분리해서 리소스별로 라우트 지정
app.use('/product', require('./routers/product') )
app.use('/dept', require('./routers/dept') )


app.listen(port, () => {
  console.log(`http://localhost:${port} 서버 실행됨`)
});