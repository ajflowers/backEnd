const db = require("../data/dbConfig.js");

module.exports = {
  add,
  find,
  findBy,
  findById,
  update
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

async function update(item) {
    const [updatedItem] = await db("inventory")
        .where({ id })
        .update(updatedItem, ["id", "itemID", "quantity"]);
        
    return db("inventory");
};