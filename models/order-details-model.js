const db = require("../data/dbConfig.js");

module.exports = {
  add,
  find,
  findBy,
  findById,
  findByOrder
};

function find() {
  return db("order_details").select();
};

function findBy(filter) {
  return db("order_details").where(filter).select();
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

function findByOrder(order_id) {
  return db("order_details")
    .where({ order_id })
    .select();
}
