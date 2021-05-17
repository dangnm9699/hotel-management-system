const knex = require('./database')

exports.createGuest = async function (data) {
    return knex('Khach').insert({
        name: data.name,
        phonenumber: data.phonenumber,
        email: data.email,
        country: data.country,
        idNumber: data.idNumber
    })
}

exports.getGuest = async function (id) {
    return knex('Khach').whereNot('status', 'đã xoá').where('Id', id).first()
}

exports.getGuestList = async function (page, perpage) {
    return knex('Khach').whereNot('status', 'đã xoá').paginate({ perPage: perpage, currentPage: page, isLengthAware: true });
}

exports.updateGuest = async function (id, data) {
    return knex('Khach').where('Id', id).update(data)
}

exports.deleteGuest = async function (id) {
    return knex('Khach').where('Id', id).update({'status': 'đã xoá'})
}
exports.searchGuestName = async function (page, perpage, key) {
    return knex('Khach').where('name', 'like', `%${key}%`).whereNot('status', 'đã xoá').select('name').paginate({ perPage: perpage, currentPage: page, isLengthAware: true })
}
exports.searchGuestByPhoneNumber = async function (page, perpage, key) {
    return knex('Khach').whereNot('status', 'đã xoá').where('phonenumber', 'like', `%${key}%`).paginate({ perPage: perpage, currentPage: page, isLengthAware: true })
}
exports.searchGuest = async function (page, perpage, key) {
    return knex('Khach').where('name', 'like', `%${key}%`).whereNot('status', 'đã xoá').paginate({ perPage: perpage, currentPage: page, isLengthAware: true })
}

exports.dropTable = async function () {
    return knex.schema.dropTable('Khach');
};
