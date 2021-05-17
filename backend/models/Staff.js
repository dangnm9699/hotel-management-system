const knex = require('./database')

exports.createStaff = async function (data) {
    return knex('NV').insert({
        name: data.name,
        birthday: data.birthday,
        address: data.address,
        description: data.description,
        idNumber: data.idNumber,
        phonenumber: data.phonenumber,
        role: data.role,
        status: data.status
    })
}

exports.getStaff = async function (id) {
    return knex('NV').where('Id', id).first()
}

exports.getStaffList = async function (page, perpage) {
    return knex('NV').whereNot('status', 'đã xoá').paginate({ perPage: perpage, currentPage: page, isLengthAware: true });
}

exports.updateStaff = async function (id, data) {
    return knex('NV').where('Id', id).update(data)
}

exports.deleteStaff = async function (id) {
    return knex('NV').where('Id', id).update({'status': 'đã xoá'})
}

exports.dropTable = async function () {
    return knex.schema.dropTable('NV');
};

exports.searchStaffName = async function (page, perpage, key) {
    return knex('NV').where('name', 'like', `%${key}%`).whereNot('status', 'đã xoá').select('name').paginate({ perPage: perpage, currentPage: page, isLengthAware: true })
}

exports.searchStaff = async function (page, perpage, key) {
    return knex('NV').where('name', 'like', `%${key}%`).whereNot('status', 'đã xoá').paginate({ perPage: perpage, currentPage: page, isLengthAware: true })
}
