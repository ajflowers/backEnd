const db = require("../data/dbConfig.js");

module.exports = {
  add,
  find,
  findBy,
  findById,
  update,
  remove
};

function find() {
  return db("orders").select();
};

function findBy(filter) {
  return db("orders").where(filter);
};

async function add(item) {
  const [newItem] = await db("orders")
    .insert(item)
    .returning("*");

  return newItem;
};

function findById(id) {
  return db("orders")
    .where({ id })
    .first()
    .select();
};

async function update(newInfo, id) {
    const [updatedItem] = await db("orders")
        .where({ id })
        .update(newInfo, ["*"]);
        
    return updatedItem;
};

function remove(id) {
  return db('orders')
    .where({id})
    .del();
}