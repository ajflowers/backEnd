
exports.up = function (knex) {
    return knex.schema
        .table('order_details', tbl => {
            tbl.renameColumn('orderID', 'order_id');
        });
};

exports.down = function (knex) {
    return knex.schema
        .table('order_details', tbl => {
            tbl.renameColumn('order_id', 'orderID');
        });
};
