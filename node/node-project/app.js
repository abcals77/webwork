const express = require('express')
const app = express()
const port = 3000

app.get('/emp', (req, res) => {
  res.send('main hello!')
})
app.get('/find', (req, res) => {
  res.send('cart hello!!!!')
})
// 부서가 10번인 첫번째 사원
app.get('/filter', (req, res) => {
  res.send('home hello!')
})
// job_id가 'it'인 사원만 조회
// firstname 순으로 정렬
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})