
exports.up = function(knex) {
    return knex.schema
        .table('inventory', inventory => {
            inventory.dropColumn('itemID');
            inventory.varchar('item', 255).notNullable();
        })
        
        .table('order_details', details => {
            details.dropColumn('itemID');
            details.varchar('item', 255).notNullable();
        })

        .dropTableIfExists('items');  
};

exports.down = function(knex) {
    return knex.schema
        .createTable('items', items => {
            items.increments();
            items.string('item_name', 255);
        })

        .table('order_details', details => {
            details.dropColumn('item');

            details
                .integer('itemID')
                .unsigned()
                .references('id')
                .inTable('orders')
                .onDelete('RESTRICT')
                .onUpdate('CASCADE');
        })

        .table('inventory', inventory => {
            inventory.dropColumn('item');

            inventory
                .integer('itemID')
                .unsigned()
                .references('id')
                .inTable('items')
                .onDelete('RESTRICT')
                .onUpdate('CASCADE');
        });
  
};
