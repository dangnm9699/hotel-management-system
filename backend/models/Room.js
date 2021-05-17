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

exports.getIdleRoomByType = async function (type, checkinTime, checkoutTime) {
    const subquery = knex('orders').join('order_room', 'order_room.orderId', 'orders.Id').where(builder =>
        builder.where('orders.checkinTime', '<=', checkinTime).andWhere('orders.checkoutTime', '>=', checkinTime)
    )
        .orWhere((builder) =>
            builder.where('orders.checkinTime', '<=', checkoutTime).andWhere('orders.checkoutTime', '>=', checkoutTime)
        ).select('roomId')
    //let result = await subquery;
    // console.log(subquery.toString())
    return knex('Phong').whereNot('status', 'đã xoá').where('type', type).whereNotIn('Id', subquery);
}
exports.checkIdleRoomId = async function (roomId, checkinTime, checkoutTime) {
    const subquery = knex('orders').join('order_room', 'order_room.orderId', 'orders.Id').where(builder =>
        builder.where('orders.checkinTime', '<=', checkinTime).andWhere('orders.checkoutTime', '>=', checkinTime)
    )
        .orWhere((builder) =>
            builder.where('orders.checkinTime', '<=', checkoutTime).andWhere('orders.checkoutTime', '>=', checkoutTime)
        ).select('roomId')
    //let result = await subquery;
    // console.log(subquery.toString())
    return knex('Phong').whereNot('status', 'đã xoá').where('Id', roomId).whereNotIn('Id', subquery).select('Id');
}


exports.dropTable = async function () {
    return knex.schema.dropTable('Phong');
};
