const knex = require('./database')

exports.createRoom = async function (data) {
    return knex('Phong').insert({
        name: data.name,
        type: data.type,
        status: data.status,
        maxadult: data.maxadult,
        maxchild: data.maxchild,
        price: data.price,
        description: data.description,
    })
}

exports.getRoom = async function (id) {
    return knex('Phong').where('Id', id).first()
}

exports.getRoomList = async function (page, perpage) {
    return knex('Phong').whereNot('status', 'đã xoá').paginate({ perPage: perpage, currentPage: page, isLengthAware: true });
}

exports.updateRoom = async function (id, data) {
    return knex('Phong').where('Id', id).update(data)
}

exports.deleteRoom = async function (id) {
    return knex('Phong').where('Id', id).update({ 'status': 'đã xoá' })
}

exports.searchRoom = async function (page, perpage, key) {
    return knex('Phong').where('name', 'like', `%${key}%`).whereNot('status', 'đã xoá').paginate({ perPage: perpage, currentPage: page, isLengthAware: true })
}

exports.searchRoomName = async function (page, perpage, key) {
    return knex('Phong').where('name', 'like', `%${key}%`).whereNot('status', 'đã xoá').select('name').paginate({ perPage: perpage, currentPage: page, isLengthAware: true })
}

exports.getIdleRoomByType = async function (type) {
    return knex('Phong').whereNot('status', 'đã xoá').where('type', type).where('status', 'Trống');
}

exports.dropTable = async function () {
    return knex.schema.dropTable('Phong');
};
