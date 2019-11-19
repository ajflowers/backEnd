const db = require('../data/dbConfig.js');

module.exports = {
    add,
    find,
    findBy,
    findById,
}

function find() {
    return db('customers').select();
}

function findBy(filter) {
    //include role info here
    return db('customers').where(filter);
}

async function add(customers) {
    const [newCustomer] = await db('customers').insert(customers).returning('*');
  
    return newCustomer;
}
  
function findById(id) {
    return db('customers')
      .where({ id })
      .first();
}