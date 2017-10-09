const router = module.exports = require('express').Router()
const book = require('../lib/book')

// Routes defined at the top of tile - for ease
router.get('/', read)
router.delete('/:id', checkLogin, remove)
// `.route()` Syntax: Handle route for 1 'path pattern' with multiple verbs defined:
router.route('/:id?')
  .post(checkLogin, createOrUpdate)
  .put( checkLogin, createOrUpdate)
// Alternate style: router.put('/:id?', checkLogin, createOrUpdate)

// **BEGIN** Express Middleware Functions

function checkLogin(req, res, next) {
  if (!req.user) return res.status(503).send({error: 'Not logged in'})
  next()
}

function read(req, res) {
  book.read({title: new RegExp(req.query.title + '.*', 'i')})
    .then(results => res.send(results))
    .catch(err    => res.json({err, stack: err.stack}))
}

function createOrUpdate(req, res) {
  let {title, genre, description, photo} = req.body;
  let id = req.params.id;
  book.createOrUpdate({id, title, genre, description, photo})
    .then(results =>  res.send({message: 'Successfully updated/inserted book', results}))
    .catch(err    =>  res.json({err, stack: err.stack}))
}

function remove(req, res) {
  book.remove({id: req.params.id})
    .then(results =>  res.send({message: 'Deleted!'}))
    .catch(err    =>  res.json({err, stack: err.stack}))
}
