const knex = require('./database')

exports.createStaff = async function (data) {
    return knex('NV').insert({
        name: data.name,
        birthday: data.birthday,
        address: data.address,
        description: data.description
    })
}

exports.getStaff = async function (id) {
    return knex('NV').where('Id', id).first()
}

exports.getStaffList = async function (page, perpage) {
    return knex('NV').paginate({ perPage: perpage, currentPage: page, isLengthAware: true });
}

exports.updateStaff = async function (id, data) {
    return knex('NV').where('Id', id).update(data)
}

exports.deleteStaff = async function (id) {
    return knex('NV').where('Id', id).del()
}

exports.dropTable = async function () {
    return knex.schema.dropTable('NV');
};
