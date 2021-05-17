exports.up = function (knex) {
  return knex.schema.createTable('account', table => {
    table.specificType('Id', 'int(10) AUTO_INCREMENT primary key').notNullable();
    table.string('username', 100).notNullable();
    table.string('password', 256).notNullable();
    table.integer("NVID");
    table.string('acctype', 50).notNullable().defaultTo('Nhân viên');
    table.unique('username');
  })
};

exports.down = function (knex) {
  knex.schema.dropTable('account');
};
