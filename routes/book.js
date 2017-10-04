const router = module.exports = require('express').Router()
const books = [{title: 'Goodnight Moon'}, {title: 'Welcome to the monkey house'}]

router.get('/', (req, res) => {
  res.send(books)
})

router.get('/:id', (req, res) => {
  books.push(req.query)
  res.send(books)
})
