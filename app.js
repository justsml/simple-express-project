const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const books = require('./routes/book')

app = express()

app.use(bodyParser())
app.use(morgan('dev'))

app.use('/books', books)

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

