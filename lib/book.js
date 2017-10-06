module.exports = {
  read,
  createOrUpdate,
  remove,
}

function read({title}) {
  return knex('book')
  .where({title: new RegExp(title + '.*', 'i')})
}

function createOrUpdate({id = null, title, genre, description, photo}) {
  if (id) {
    return knex('book')
    .where('id', id)
    .update({title, genre, description, photo})
  } else {
    return knex('book')
    .returning('id')
    .insert({title, genre, description, photo})
  }
}

function remove({id}) {
  return knex('book')
  .where('id', id)
}
