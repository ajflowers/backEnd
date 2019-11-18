
exports.up = function (knex) {
    return knex.schema
    
        .createTable('farm_users', users => {
            users.increments();

            users
                .varchar('username', 255)
                .notNullable()
                .unique();

            users.varchar('password', 255).notNullable();
        })

    
        .createTable('customers', users => {
            users.increments();

            users
                .varchar('username', 255)
                .notNullable()
                .unique();

            users.varchar('password', 255).notNullable();
        })

        .createTable('farms', farms => {
            farms.increments();

            farms
                .varchar('name', 255)
                .notNullable()
                .unique();

            farms
                .varchar('address', 255)
                .notNullable();

            farms
                .integer('farmerID')
                .unsigned()
                .references('id')
                .inTable('farm_users')
                .onDelete('RESTRICT')
                .onUpdate('CASCADE');
        })

        .createTable('items', items => {
            items.increments();
            items.string('item_name', 255);
        })

        .createTable('inventory', inv =>{
            inv.increments();

            inv
                .integer('itemID')
                .unsigned()
                .references('id')
                .inTable('items')
                .onDelete('RESTRICT')
                .onUpdate('CASCADE');

            inv
                .integer('farmID')
                .unsigned()
                .references('id')
                .inTable('farms')
                .onDelete('RESTRICT')
                .onUpdate('CASCADE');

            inv
                .integer('quantity')
                .unsigned();
        })

        .createTable('orders', orders => {
            orders.increments();

            orders
                .integer('customer')
                .unsigned()
                .references('id')
                .inTable('customers')
                .onDelete('RESTRICT')
                .onUpdate('CASCADE');

            orders
                .integer('farm')
                .unsigned()
                .references('id')
                .inTable('farms')
                .onDelete('RESTRICT')
                .onUpdate('CASCADE');

            orders.timestamp('order_date');
            orders.boolean('filled').defaultTo(false);
            orders.boolean('picked_up').defaultTo(false);
        })

        .createTable('orderDetails', details => {
            details.increments();

            details
                .integer('orderID')
                .unsigned()
                .references('id')
                .inTable('orders')
                .onDelete('RESTRICT')
                .onUpdate('CASCADE');

            details
                .integer('itemID')
                .unsigned()
                .references('id')
                .inTable('orders')
                .onDelete('RESTRICT')
                .onUpdate('CASCADE');

            details
                .integer('quantity')
                .unsigned()
                .notNullable();

        })

    
};

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists('orderDetails')
        .dropTableIfExists('orders')
        .dropTableIfExists('inventory')
        .dropTableIfExists('items')
        .dropTableIfExists('farms')
        .dropTableIfExists('customers')
        .dropTableIfExists('farmUsers');       

};
