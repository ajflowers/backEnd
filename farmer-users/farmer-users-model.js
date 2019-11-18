const db = require('../data/dbConfig.js');

module.exports = {
  add,
  find,
  findBy,
  findById,
};

function find() {
  return db('farm_users').select('id', 'username');
}

function findBy(filter) {
  return db('farm_users').where(filter);
}

async function add(user) {
  const [newuser] = await db('farm_users').insert(user).returning('username');

  return newuser;
}

function findById(id) {
  return db('farm_users')
    .where({ id })
    .first();
}
