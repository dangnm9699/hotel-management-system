exports.up = function (knex) {
    return knex.schema.createTable('Khach', table => {
        table.specificType('Id', 'int(11) AUTO_INCREMENT primary key').notNullable();
        table.string('phonenumber').notNullable();
        table.string('name').notNullable();
        table.unique('phonenumber');
        table.string('email').notNullable();
        table.string('country').notNullable();
        table.string('idNumber').notNullable();
        table.string('status').notNullable().defaultTo('Hoạt động');
    })
};

exports.down = function (knex) {
    knex.schema.dropTable('Khach');
};
