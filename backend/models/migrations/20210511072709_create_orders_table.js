exports.up = function (knex) {
    return knex.schema.createTable('orders', table => {
        table.specificType('Id', 'int(11) AUTO_INCREMENT primary key').notNullable();
        table.integer("khachId").notNullable();
        table.foreign("khachId").references("Khach.Id");
        table.integer('cost', 20).notNullable();
        table.integer('paid', 20).notNullable();
        table.integer('numday').notNullable();
        table.datetime('checkinTime').notNullable();
        table.datetime('checkoutTime').notNullable();
        table.string('type').notNullable().defaultTo('hold');
    })
};

exports.down = function (knex) {
    knex.schema.dropTable('Khach');
};
