const db = require('../data/dbConfig.js');

module.exports = {
  add,
  find,
  findBy,
  findById,
  update
};

function find() {
  return db('farmers')
    .select('id', 'farm_name', 'farm_address')
    .whereNotNull('farm_name');
}

function findBy(filter) {
  //include role info here
  return db('farmers').where(filter);
}

async function add(user) {
  const [newuser] = await db('farmers').insert(user).returning(['id', 'username']);

  return newuser;
}

function findById(id) {
  return db('farmers')
    .where({ id })
    .first()
    .select('id', 'username', 'farm_name', 'farm_address');
}

async function update(farmInfo, id) {
  const [updatedFarm] = await db('farmers')
      .where({id})
      .update(farmInfo, ['id', 'username', 'farm_name', 'farm_address' ]);

  return updatedFarm;
}