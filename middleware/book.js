const router = module.exports = require('express').Router()

router.get('/', (req, res) => {
  return knex('book')
  .where({title: new RegExp(req.query.title + '.*', 'i')})
  .then(results => res.send(results))
  .catch(err => res.json({err, stack: err.stack}))
})

router.put('/', (req, res) => {
  let {title, genre, description, photo} = req.body;

  return knex('book')
  .returning('id')
  .insert({title, genre, description, photo})
  .then(ids =>  res.send({message: 'Successfully created book', results: ids}))
  .catch(err => res.json({err, stack: err.stack}))
})

router.post('/:id', (req, res) => {
  let {title, genre, description, photo} = req.body;

  return knex('book')
  .where('id', req.params.id)
  .update({title, genre, description, photo})
  .then(results =>  res.send({message: 'Successfully updated book', results}))
  .catch(err =>     res.json({err, stack: err.stack}))
})

router.delete('/:id', (req, res) => {
  return knex('book')
  .where('id', req.params.id)
  .then(results =>  res.send(results))
  .catch(err =>     res.json({err, stack: err.stack}))
})

