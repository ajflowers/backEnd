const bcrypt = require('bcryptjs');

exports.seed = function(knex) {
  return knex('farmers').insert([
    {
      username: "farmer1",
      password: bcrypt.hashSync("testing123"),
      farm_name: "Old McDonald's Farm",
      farm_address: "31310 Route 1",
    },
    {
      username: "farmer2",
      password: bcrypt.hashSync("testing123"),
      farm_name: "Shady Acres Orchards",
      farm_address: "000 Dyrt Road",
    },
    {
      username: "farmer3",
      password: bcrypt.hashSync("testing123"),
      farm_name: "Bob's Farm",
      farm_address: "123 Out Of Jokes Rd",
    }
  ]);
};




// exports.seed = function(knex) {
//   // Deletes ALL existing entries
//   return knex('farmers').truncate()
//     .then(function () {
//       // Inserts seed entries
//       return knex('farmers').insert([
//         {
//           id: 0,
//           username: "MacDonald",
//           password: "12",
//           farm_name: "Old MacDonald's Farm",
//           Farm_address: "E. I. O. Way"
//         },
//         {
//           id: 1,
//           username: "June",
//           password: "12",
//           farm_name: "Junebug's Farm",
//           Farm_address: "111 Insect Alley"
//         },
//         {
//           id: 0,
//           username: "Green",
//           password: "12",
//           farm_name: "Green Thumbs",
//           Farm_address: "5 Digits Rd."
//         }
//       ]);
//     });
    
// };
