const knex = require('./database')

exports.createGuest = async function (data) {
    return knex('Khach').insert({
        name: data.name,
        phonenumber: data.phonenumber
    })
}

exports.getGuest = async function (id) {
    return knex('Khach').where('Id', id).first()
}

exports.getGuestList = async function (page, perpage) {
    return knex('Khach').paginate({ perPage: perpage, currentPage: page, isLengthAware: true });
}

exports.updateGuest = async function (id, data) {
    return knex('Khach').where('Id', id).update(data)
}

exports.deleteGuest = async function (id) {
    return knex('Khach').where('Id', id).del()
}

exports.dropTable = async function () {
    return knex.schema.dropTable('Khach');
};
