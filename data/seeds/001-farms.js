
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('farmers').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('farmers').insert([
        {
          id: 0,
          username: "MacDonald",
          password: "12",
          farm_name: "Old MacDonald's Farm",
          Farm_address: "E. I. O. Way"
        },
        {
          id: 1,
          username: "June",
          password: "12",
          farm_name: "Junebug's Farm",
          Farm_address: "111 Insect Alley"
        },
        {
          id: 0,
          username: "Green",
          password: "12",
          farm_name: "Green Thumbs",
          Farm_address: "5 Digits Rd."
        }
      ]);
    });
    
};
