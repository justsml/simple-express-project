const router = module.exports = require('express').Router()
const {createOrUpdate, read, remove} = require('../lib/book')

router.get('/', read)
router.put('/:id?', checkLogin, createOrUpdate)
router.post('/:id?', checkLogin, createOrUpdate)
router.delete('/:id', checkLogin, remove)

const checkLogin = (req, res, next) => {
  if (!req.user) return res.status(503).send({error: 'Not logged in'})
  next()
}

function read(req, res) {
  return read({title: new RegExp(req.query.title + '.*', 'i')})
  .then(results => res.send(results))
  .catch(err => res.json({err, stack: err.stack}))
}

function createOrUpdate(req, res) {
  let {title, genre, description, photo} = req.body;
  let id = req.params.id;
  createOrUpdate({id, title, genre, description, photo})
    .then(results =>  res.send({message: 'Successfully updated/inserted book', results}))
    .catch(err =>     res.json({err, stack: err.stack}))
}

function remove(req, res) {
  remove({id: req.params.id})
  .then(results =>  res.send({message: 'Deleted!'}))
  .catch(err =>     res.json({err, stack: err.stack}))
}


