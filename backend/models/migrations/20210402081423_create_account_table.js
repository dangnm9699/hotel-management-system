const knex = require("knex");

exports.up = function(knex, promise) {
  return knex.schema.createTable('account', table =>{
      table.specificType('userId', 'int(11) AUTO_INCREMENT primary key').notNullable();
      table.string('username', 100).notNullable();
      table.string('password', 256).notNullable();
      table.string('acctype', 50).notNullable().defaultTo('Lễ tân');
      table.unique('username');
  })
};

exports.down = function(knex) {
  knex.schema.dropTable('account');
};
