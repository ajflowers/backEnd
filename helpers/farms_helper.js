const db = require('../data/dbConfig.js');

module.exports = {
    add,
    find,
    findBy,
    findById,
}

function find() {
    return db('farms').select();
}

function findBy(filter) {
    //include role info here
    return db('farms').where(filter);
}

async function add(farm) {
    const [newFarm] = await db('farms').insert(farm).returning('*');
  
    return newFarm;
}
  
function findById(id) {
    return db('farms')
      .where({ id })
      .first();
}