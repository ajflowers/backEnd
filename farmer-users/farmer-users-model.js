const db = require('../data/dbConfig.js');

module.exports = {
  add,
  find,
  findBy,
  findById,
};

function find() {
  return db('farmUsers').select('id', 'username');
}

function findBy(filter) {
  //include role info here
  return db('farmUsers').where(filter);
}

async function add(user) {
  const [id] = await db('farmUsers').insert(user);

  return findById(id);
}

function findById(id) {
  return db('farmUsers')
    .where({ id })
    .first();
}
