const bcrypt = require('bcryptjs');

exports.seed = function(knex) {
  return knex('customers').insert([
    {
      username: "customer1",
      password: bcrypt.hashSync("testing123")
    },
    {
      username: "customer2",
      password: bcrypt.hashSync("testing123")
    },
    {
      username: "customer3",
      password: bcrypt.hashSync("testing123")
    }
  ]);
};
