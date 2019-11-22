
exports.seed = function(knex) {
  return knex('orders').insert([
    {customer_id: 1, farm_id: 1, customer_name: "Alice", customer_email: "alice@isp.net", order_date: "2019-11-20"},
    {customer_id: 2, farm_id: 1, customer_name: "Bob", customer_email: "bob@isp.net", order_date: "2019-11-21"},
    {customer_id: 3, farm_id: 2, customer_name: "Carol", customer_email: "carol@isp.net", order_date: "2019-11-21"}
  ]);
};