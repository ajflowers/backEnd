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
  return db("order_detail").select();
};

function findBy(filter) {
  return db("order_detail").where(filter);
};

async function add(item) {
  const [newItem] = await db("order_detail")
    .insert(item)
    .returning("*");

  return newItem;
};

function findById(id) {
  return db("order_detail")
    .where({ id })
    .first()
    .select();
};

async function update(newInfo, id) {
    const [updatedItem] = await db("order_detail")
        .where({ id })
        .update(newInfo, ["id", "item", "quantity"]);
        
    return updatedItem;
};

function remove(id) {
  return db('order_detail')
    .where({id})
    .del();
}