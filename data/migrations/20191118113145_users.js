
exports.up = function (knex) {
    return knex.schema.createTable('users', users => {
        users.increments();

        users
            .varchar('username', 255)
            .notNullable()
            .unique();

        users.varchar('password', 255).notNullable();
        users.varchar('role', 128).notNullable();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('users');
};
