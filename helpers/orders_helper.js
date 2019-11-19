const db = require('../data/dbConfig.js');

module.exports = {
    add,
    find,
    findBy,
    findById,
}

function find() {
    return db('orders').select();
}

function findBy(filter) {
    //include role info here
    return db('orders').where(filter);
}

async function add(order) {
    const [newOrder] = await db('orders').insert(orders).returning('*');
  
    return newOrder;
}
  
function findById(id) {
    return db('orders')
      .where({ id })
      .first();
}