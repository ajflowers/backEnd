
exports.seed = function(knex) {
  return knex('order_details').insert([
    {order_id: 1, item: "potatoes", quantity: 8},
    {order_id: 1, item: "carrots", quantity: 12},
    {order_id: 1, item: "apples", quantity: 8},
    {order_id: 2, item: "carrots", quantity: 4},
    {order_id: 2, item: "beets", quantity: 3},
    {order_id: 3, item: "pumpkins", quantity: 2},
    {order_id: 3, item: "squash", quantity: 6},
    {order_id: 3, item: "corn", quantity: 12},
    {order_id: 3, item: "apples", quantity: 20}
  ]);
};