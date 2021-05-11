exports.up = function (knex) {
    return knex.schema.createTable('order_room', table => {
        table.specificType('Id', 'int(11) AUTO_INCREMENT primary key').notNullable();
        table.integer("orderId").notNullable();
        table.foreign("orderId").references("orders.Id");
        table.integer("roomId").notNullable();
        table.foreign("roomId").references("Phong.Id");
        table.integer('cost').notNullable();
        table.integer('numAdult').notNullable().defaultTo(0);
        table.integer('numChild').notNullable().defaultTo(0);
        table.integer('extra').notNullable().defaultTo(0);
    })
};

exports.down = function (knex) {
    knex.schema.dropTable('Khach');
};