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
  return db("inventory").select();
};

function findBy(filter) {
  return db("inventory").where(filter);
};

async function add(item) {
  const [newItem] = await db("inventory")
    .insert(item)
    .returning("*");

  return newItem;
};

function findById(id) {
  return db("inventory")
    .where({ id })
    .first()
    .select();
};

async function update(newInfo, id) {
    const [updatedItem] = await db("inventory")
        .where({ id })
        .update(newInfo, ["id", "item", "quantity"]);
        
    return updatedItem;
};

function remove(id) {
  return db('inventory')
    .where({id})
    .del();
}