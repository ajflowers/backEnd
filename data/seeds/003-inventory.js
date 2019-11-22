
exports.seed = function(knex) {
  return knex('inventory').insert([
    {farm_id: 1, item: 'apples', quantity: 100},
    {farm_id: 1, item: 'carrots', quantity: 20},
    {farm_id: 1, item: 'beets', quantity: 10},
    {farm_id: 2, item: 'apples', quantity: 45},
    {farm_id: 2, item: 'pumpkins', quantity: 15},
    {farm_id: 2, item: 'corn', quantity: 75},
    {farm_id: 2, item: 'squash', quantity: 30},
    {farm_id: 3, item: 'turnips', quantity: 35},
    {farm_id: 3, item: 'potatoes', quantity: 100},
    {farm_id: 3, item: 'parsnips', quantity: 40},
  ]);
};