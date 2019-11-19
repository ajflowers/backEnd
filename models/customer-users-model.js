const db = require('../data/dbConfig.js');

module.exports = {
  add,
  find,
  findBy,
  findById,
};

function find() {
  return db('customers').select('id', 'username');
}

function findBy(filter) {
  //include role info here
  return db('customers').where(filter);
}

async function add(user) {
  const [newuser] = await db('customers').insert(user).returning('*');

  return newuser;
}

function findById(id) {
  return db('customers')
    .where({ id })
    .first();
}
