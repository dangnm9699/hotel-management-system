exports.up = function (knex) {
  return knex.schema.createTable('NV', table => {
    table.specificType('Id', 'int(11) AUTO_INCREMENT primary key').notNullable();
    table.string('name', 100).notNullable();
    table.date('birthday');
    table.string('address').notNullable().defaultTo('')
    table.string('description').notNullable().defaultTo('');
  })
};

exports.down = function (knex) {
  knex.schema.dropTable('NV');
};
