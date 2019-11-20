
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('farmers').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('farmers').insert([
        {
          
        }
      ]);
    });
};
