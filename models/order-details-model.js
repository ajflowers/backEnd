const db = require("../data/dbConfig.js");

module.exports = {
  add,
  find,
  findBy,
  findById,
};

function find() {
  return db("order_details").select();
};

function findBy(filter) {
  return db("order_details").where(filter);
};

async function add(item) {
  const [newItem] = await db("order_details")
    .insert(item)
    .returning(["item", "quantity"]);

  return newItem;
};

function findById(id) {
  return db("order_details")
    .where({ id })
    .first()
    .select();
};
