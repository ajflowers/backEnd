
exports.up = function (knex) {
    return knex.schema
        .table('orders', tbl => {
            tbl.renameColumn('customer', 'customer_id');
        });
};

exports.down = function (knex) {
    return knex.schema
        .table('orders', tbl => {
            tbl.renameColumn('customer_id', 'customer');
        });
};
