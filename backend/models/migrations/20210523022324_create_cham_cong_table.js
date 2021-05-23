
exports.up = function (knex) {
    return knex.schema.createTable('cham_cong', table => {
        table.specificType('Id', 'int(11) AUTO_INCREMENT primary key').notNullable();
        table.integer("NVId").notNullable();
        table.foreign("NVId").references("NV.Id");
        table.datetime("date")
    })
};

exports.down = function (knex) {

};
