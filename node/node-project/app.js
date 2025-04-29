const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('main hello!')
})
app.get('/cart', (req, res) => {
  res.send('cart hello!!!!')
})
app.get('/home', (req, res) => {
  res.send('home hello!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})