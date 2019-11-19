const db = require('../data/dbConfig.js');

module.exports = {
    add,
    find,
    findBy,
    findById,
    update
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

async function update(farmInfo, id) {
    const [updatedFarm] = await db('farms')
        .where({id})
        .update(farmInfo, ['*']);
  
    return updatedFarm;
}