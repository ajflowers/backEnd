const db = require('../data/dbConfig.js');

module.exports = {
    add,
    find,
    findBy,
    findById
};
  
function find() {
    return db('items')
      .select();
  }
  
  function findBy(filter) {
    return db('items').where(filter);
  }
  
  async function add(item) {
    const [newItem] = await db('items').insert(item).returning('*');
  
    return newItem;
  }
  
  function findById(id) {
    return db('items')
      .where({ id })
      .first()
      .select();
  }
  