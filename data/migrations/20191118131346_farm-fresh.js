
exports.up = function (knex) {
    return knex.schema
    
        .createTable('farmers', users => {
            users.increments();

            users
                .varchar('username', 255)
                .notNullable()
                .unique();

            users.varchar('password', 255).notNullable();

            users
                .varchar('farm_name', 255)
                .defaultTo(null);

                users
                .varchar('farm_address', 255)
                .defaultTo(null);

        })

    
        .createTable('customers', users => {
            users.increments();

            users
                .varchar('username', 255)
                .notNullable()
                .unique();

            users.varchar('password', 255).notNullable();
        })

        // .createTable('farms', farms => {
        //     farms.increments();

        //     farms
        //         .varchar('name', 255)
        //         .notNullable()
        //         .unique();

        //     farms
        //         .varchar('address', 255)
        //         .notNullable();

        //     farms
        //         .integer('farmerID')
        //         .unsigned()
        //         .references('id')
        //         .inTable('farm_users')
        //         .onDelete('RESTRICT')
        //         .onUpdate('CASCADE');
        // })

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
                .integer('farm_id')
                .unsigned()
                .references('id')
                .inTable('farmers')
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
                .integer('farm_id')
                .unsigned()
                .references('id')
                .inTable('farmers')
                .onDelete('RESTRICT')
                .onUpdate('CASCADE');

            orders 
                .varchar('customer_name', 255)
                .notNullable();

            orders 
                .varchar('customer_email', 255)
                .notNullable();


            orders.timestamp('order_date');
            orders.boolean('filled').defaultTo(false);
            orders.boolean('picked_up').defaultTo(false);
        })

        .createTable('order_details', details => {
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
        });    
};

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists('orderDetails') //deprecate after next migration

        .dropTableIfExists('order_details')
        .dropTableIfExists('orders')
        .dropTableIfExists('inventory')
        .dropTableIfExists('items')
        .dropTableIfExists('farms')
        .dropTableIfExists('customers')

        .dropTableIfExists('farm_users') //deprecate after next migration
        
        .dropTableIfExists('farmers');
        


};
