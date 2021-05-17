
const e = require('express');
const knex = require('./database')
var Room = require('../models/Room')

exports.createOrder = async function (data) {
    var roomStatus = '';
    if (data.type === 'hold') {
        roomStatus = 'Đã đặt trước';
    }
    let orderStatus = 'uncheck';
    if (data.type === 'confirm') {
        roomStatus = 'Đang sử dụng';
        orderStatus = 'checkedin'
    }

    var res = await knex.transaction(async (trx) => {
        let roomIds = [];
        data.rooms.forEach(room => {
            roomIds.push(room.roomId)
        });
        try {
            let costs = [];
            for (let i = 0; i < roomIds.length; i++) {
                let check = await trx.where('Id', roomIds[i]).select('status', 'price', 'name').from('Phong');
                // console.log(check)
                if (check[0].status === 'Trống') {
                    // console.log(check)
                    costs.push(check[0].price)
                    await trx.where('Id', roomIds[i]).update('status', roomStatus).into('Phong');
                } else {
                    let checkId = await Room.checkIdleRoomId(roomIds[i], data.checkinTime, data.checkoutTime)
                    if (checkId.length > 0) {
                        costs.push(check[0].price)
                        await trx.where('Id', roomIds[i]).update('status', roomStatus).into('Phong');
                    }else{
                        let message = 'Phòng ' + check[0].name + ' đã sử dụng'
                        return Promise.reject(message);
                    }
                }
            }
            let khachId = -1;
            if (data.guestType === 'new') {
                khachId = await trx.insert(data.guest).into('Khach')
                console.log('khachId:', khachId)
            } else if (data.guestType === 'return') {
                khachId = data.guest.Id
            }

            let orderId = await trx.insert({
                'khachId': khachId,
                'cost': data.cost,
                'paid': data.paid,
                'numday': data.numday,
                'checkinTime': data.checkinTime,
                'checkoutTime': data.checkoutTime,
                'type': data.type,
                'status': orderStatus,
            }).into('orders')
            let order_rooms = [];
            data.rooms.forEach((room, i) => {
                room.orderId = orderId;
                room.cost = costs[i];
                order_rooms.push(room)
            });
            await trx.insert(order_rooms).into('order_room');
            return orderId;
        } catch (err) {
            return Promise.reject(err);
            // console.log(err)
        }
    });
    return res;
}
exports.getOrder = async function (orderId) {
    let rows = await knex('order_room').join('orders', 'orders.Id', 'order_room.orderId').join('Phong', 'Phong.Id', 'order_room.roomId')
        .join('Khach', 'Khach.Id', 'orders.khachId').where('orders.Id', orderId).select({
            'orders.Id': 'orders.Id',
            'orders.cost': 'orders.cost',
            'orders.checkinTime': 'orders.checkinTime',
            'orders.checkoutTime': 'orders.checkoutTime',
            'orders.numday': 'numday',
            'orders.paid': 'paid',
            'orders.type': 'orders.type',
            'orders.status': 'orders.status',
            'Khach.Id': 'orders.khachId',
            'Khach.name': 'Khach.name',
            'Khach.phonenumber': 'Khach.phonenumber',
            'Khach.email': 'Khach.email',
            'Khach.country': 'Khach.country',
            'Khach.idNumber': 'Khach.idNumber',
            'Khach.status': 'Khach.status',

            'Phong.Id': 'Phong.Id',
            'Phong.name': 'Phong.name',
            'Phong.type': 'Phong.type',
            'Phong.status': 'Phong.status',
            'Phong.maxadult': 'Phong.maxadult',
            'Phong.maxchild': 'Phong.maxchild',
            'Phong.price': 'Phong.price',
            'Phong.description': 'Phong.description',
            'Phong.numAdult': 'numAdult',
            'Phong.numChild': 'numChild',
            'Phong.extra': 'extra',
            'Phong.cost': 'order_room.cost'
        });
    let row = rows[0]
    let data = {};
    data.order = {
        'Id': row['orders.Id'],
        'cost': row['orders.cost'],
        'checkinTime': row['orders.checkinTime'],
        'checkoutTime': row['orders.checkoutTime'],
        'numday': row['orders.numday'],
        'paid': row['orders.paid'],
        'type': row['orders.type'],
        'status': row['orders.status']
    }
    data.Khach = {
        'Id': row['Khach.Id'],
        'name': row['Khach.name'],
        'phonenumber': row['Khach.phonenumber'],
        'email': row['Khach.email'],
        'country': row['Khach.country'],
        'idNumber': row['Khach.idNumber'],
        'status': row['Khach.status'],
    }
    data.rooms = [];
    rows.forEach(row => {
        data.rooms.push({
            'Id': row['Phong.Id'],
            'name': row['Phong.name'],
            'type': row['Phong.type'],
            'status': row['Phong.status'],
            'maxadult': row['Phong.maxadult'],
            'maxchild': row['Phong.maxchild'],
            'price': row['Phong.price'],
            'description': row['Phong.description'],
            'numAdult': row['Phong.numAdult'],
            'numChild': row['Phong.numChild'],
            'extra': row['Phong.extra'],
            'cost': row['Phong.cost']
        });
    });
    // console.log(data)
    return data
}
exports.getListOrderToCheckIn = async function (page, perpage) {
    let orderIds = await knex('orders').where('status', 'uncheck').where('checkinTime', '>=', new Date()).orderBy('checkinTime', 'desc').select('Id').paginate({ perPage: perpage, currentPage: page, isLengthAware: true });
    let data = {};
    data.data = [];
    for (let i = 0; i < orderIds.data.length; i++) {
        let temp = await exports.getOrder(orderIds.data[i].Id)
        data.data.push(temp);
    }
    data.pagination = orderIds.pagination;
    return data
}
exports.getListOrderToCheckInByDay = async function (page, perpage) {
    var end = new Date();
    end.setHours(23, 59, 59, 999);
    var start = new Date();
    start.setHours(0, 0, 0, 0);
    // console.log("start: ", start.toString(), ". end: ", end.toString())
    let orderIds = await knex('orders').where('status', 'uncheck').where('checkinTime', '>=', start).where('checkinTime', '<=', end).orderBy('checkinTime', 'asc').select('Id').paginate({ perPage: perpage, currentPage: page, isLengthAware: true });
    let data = {};
    data.data = [];
    for (let i = 0; i < orderIds.data.length; i++) {
        let temp = await exports.getOrder(orderIds.data[i].Id)
        data.data.push(temp);
    }
    data.pagination = orderIds.pagination;
    // console.log(JSON.stringify(data))
    return data
}

exports.getListOrderToCheckInByTomorrow = async function (page, perpage) {
    var start = new Date();
    start.setHours(0, 0, 0, 0);
    start.setDate(start.getDate() + 1);
    var end = new Date();
    end.setHours(23, 59, 59, 999);
    end.setDate(end.getDate() + 1);
    // console.log("start: ", start.toString(), ". end: ", end.toString())
    let orderIds = await knex('orders').where('status', 'uncheck').where('checkinTime', '>=', start).where('checkinTime', '<=', end).orderBy('checkinTime', 'asc').select('Id').paginate({ perPage: perpage, currentPage: page, isLengthAware: true });
    let data = {};
    data.data = [];
    for (let i = 0; i < orderIds.data.length; i++) {
        let temp = await exports.getOrder(orderIds.data[i].Id)
        data.data.push(temp);
    }
    data.pagination = orderIds.pagination;
    // console.log(JSON.stringify(data))
    return data
}
exports.getListOrderToCheckInByWeek = async function (page, perpage) {
    var today = new Date();
    day = today.getDay();
    if (!day) {
        day = 7
    }
    var first = today.getDate() - day + 1; // First day is the day of the month - the day of the week
    var last = first + 6; // last day is the first day + 6
    var start = new Date(today.setDate(first))
    start.setHours(0, 0, 0, 0);
    var end = new Date(today.setDate(last))
    end.setHours(23, 59, 59, 999);
    // console.log("start: ", start.toString(), ". end: ", end.toString())
    let orderIds = await knex('orders').where('status', 'uncheck').where('checkinTime', '>=', start).where('checkinTime', '<=', end).orderBy('checkinTime', 'asc').select('Id').paginate({ perPage: perpage, currentPage: page, isLengthAware: true });
    let data = {};
    data.data = [];
    for (let i = 0; i < orderIds.data.length; i++) {
        let temp = await exports.getOrder(orderIds.data[i].Id)
        data.data.push(temp);
    }
    data.pagination = orderIds.pagination;
    // console.log(JSON.stringify(data))
    return data
}
exports.checkIn = async function (orderId) {
    let subquery = knex('order_room').join('orders', 'orders.Id', 'order_room.orderId').where('orders.Id', orderId).select('roomId')
    let result = {};
    result.orders = await knex('orders').where('Id', orderId).update({ 'status': 'checkedin' })
    result.rooms = await knex('Phong').whereIn('Id', subquery).update({ 'status': 'Đang sử dụng' })
    return result;
}
exports.checkOut = async function (orderId) {
    let subquery = knex('order_room').join('orders', 'orders.Id', 'order_room.orderId').where('orders.Id', orderId).select('roomId')
    let result = {};
    result.orders = await knex('orders').where('Id', orderId).update({ 'status': 'checkedout' })
    let orderedRoom = knex('order_room').join('orders', 'orders.Id', 'order_room.orderId')
        .whereIn('roomId', subquery).where('orders.status', 'uncheck').select('roomId')
    result.emptyRooms = await knex('Phong').whereIn('Id', subquery).whereNotIn('Id', orderedRoom).update({ 'status': 'Trống' })
    result.orderedRooms = await knex('Phong').whereIn('Id', orderedRoom).update({ 'status': 'Đã đặt trước' })
    return result;
}
exports.getListOrderToCheckOutByDay = async function (page, perpage) {
    var end = new Date();
    end.setHours(23, 59, 59, 999);
    var start = new Date();
    start.setHours(0, 0, 0, 0);
    // console.log("start: ", start.toString(), ". end: ", end.toString())
    let orderIds = await knex('orders').where('status', 'checkedin').where('checkoutTime', '>=', start).where('checkoutTime', '<=', end).orderBy('checkoutTime', 'asc').select('Id').paginate({ perPage: perpage, currentPage: page, isLengthAware: true });
    let data = {};
    data.data = [];
    for (let i = 0; i < orderIds.data.length; i++) {
        let temp = await exports.getOrder(orderIds.data[i].Id)
        data.data.push(temp);
    }
    data.pagination = orderIds.pagination;
    // console.log(JSON.stringify(data))
    return data
}

exports.getListOrderToCheckOutByTomorrow = async function (page, perpage) {
    var start = new Date();
    start.setHours(0, 0, 0, 0);
    start.setDate(start.getDate() + 1);
    var end = new Date();
    end.setHours(23, 59, 59, 999);
    end.setDate(end.getDate() + 1);
    // console.log("start: ", start.toString(), ". end: ", end.toString())
    let orderIds = await knex('orders').where('status', 'checkedin').where('checkoutTime', '>=', start).where('checkoutTime', '<=', end).orderBy('checkoutTime', 'asc').select('Id').paginate({ perPage: perpage, currentPage: page, isLengthAware: true });
    let data = {};
    data.data = [];
    for (let i = 0; i < orderIds.data.length; i++) {
        let temp = await exports.getOrder(orderIds.data[i].Id)
        data.data.push(temp);
    }
    data.pagination = orderIds.pagination;
    // console.log(JSON.stringify(data))
    return data
}
exports.getListOrderToCheckOutByWeek = async function (page, perpage) {
    var today = new Date();
    day = today.getDay();
    if (!day) {
        day = 7
    }
    var first = today.getDate() - day + 1; // First day is the day of the month - the day of the week
    var last = first + 6; // last day is the first day + 6
    var start = new Date(today.setDate(first))
    start.setHours(0, 0, 0, 0);
    var end = new Date(today.setDate(last))
    end.setHours(23, 59, 59, 999);
    // console.log("start: ", start.toString(), ". end: ", end.toString())
    let orderIds = await knex('orders').where('status', 'checkedin').where('checkoutTime', '>=', start).where('checkoutTime', '<=', end).orderBy('checkoutTime', 'asc').select('Id').paginate({ perPage: perpage, currentPage: page, isLengthAware: true });
    let data = {};
    data.data = [];
    for (let i = 0; i < orderIds.data.length; i++) {
        let temp = await exports.getOrder(orderIds.data[i].Id)
        data.data.push(temp);
    }
    data.pagination = orderIds.pagination;
    // console.log(JSON.stringify(data))
    return data
}
exports.getListInHouse = async function (page, perpage) {
    // console.log("start: ", start.toString(), ". end: ", end.toString())
    let orderIds = await knex('orders').where('status', 'checkedin').orderBy('checkoutTime', 'asc').select('Id').paginate({ perPage: perpage, currentPage: page, isLengthAware: true });
    let data = {};
    data.data = [];
    for (let i = 0; i < orderIds.data.length; i++) {
        let temp = await exports.getOrder(orderIds.data[i].Id)
        data.data.push(temp);
    }
    data.pagination = orderIds.pagination;
    // console.log(JSON.stringify(data))
    return data
}
// // exports.getOrder(1)
// exports.getListOrderToCheckIn(1,6)
// exports.getListOrderToCheckInByWeek(1,6)