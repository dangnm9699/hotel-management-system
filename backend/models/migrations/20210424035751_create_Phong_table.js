exports.up = function (knex) {
  return knex.schema.createTable('Phong', table => {
    table.specificType('Id', 'int(11) AUTO_INCREMENT primary key').notNullable();
    table.string('name').notNullable();
    // table.unique('name');
    table.string('type').notNullable();
    table.string('status').notNullable().defaultTo('Trống');
    table.integer('maxadult').notNullable().defaultTo(0)
    table.integer('maxchild').notNullable().defaultTo(0)
    table.integer('price').notNullable().defaultTo(0)
    table.string('description').notNullable().defaultTo('')
  })
};

exports.down = function (knex) {
  knex.schema.dropTable('Phong');
};
