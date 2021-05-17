const Room = require('../models/Room')

exports.createRoom = async function (req, res) {
    try {
        let id = await Room.createRoom(req.body)
        res.json({
            success: true,
            id
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            err,
        })
    }
}

exports.getRoom = async function (req, res) {
    try {
        let room = await Room.getRoom(req.params.id)
        if (!room) {
            res.status(404).json({
                success: false,
                message: "Room not found"
            })
            return
        }
        res.json({
            success: true,
            data: room,
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            err,
        })
    }
}

exports.getRoomList = async function (req, res) {
    try {
        let page = parseInt(req.query.page, 10) || 1
        let perpage = parseInt(req.query.perpage) || 1000
        let result = await Room.getRoomList(page, perpage)
        result.success = true
        res.json(result)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            err,
        })
    }
}

exports.updateRoom = async function (req, res) {
    try {
        let count = await Room.updateRoom(req.params.id, req.body)
        if (count == 0) {
            res.status(404).json({
                success: false,
                message: "Room not found"
            })
            return
        }
        res.json({
            success: true,
            count
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            err,
        })
    }
}

exports.deleteRoom = async function (req, res) {
    try {
        let count = await Room.deleteRoom(req.params.id)
        if (count == 0) {
            res.status(404).json({
                success: false,
                message: "Room not found"
            })
            return
        }
        res.json({
            success: true,
            count
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            err,
        })
    }
}

exports.searchRoom = async function (req, res) {
    try {
        let key = req.query.key
        let page = req.query.page || 1
        let perpage = req.query.perpage || 1000
        let result = await Room.searchRoom(page, perpage, key)
        result.success = true
        res.json(result)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            err,
        })
    }
}

exports.searchRoomName = async function (req, res) {
    try {
        let key = req.query.key
        let page = req.query.page || 1
        let perpage = req.query.perpage || 1000
        let result = await Room.searchRoomName(page, perpage, key)
        result.success = true
        res.json(result)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            err,
        })
    }
}

exports.getIdleRoomByType = async function (req, res) {
    try {
        let type = req.query.type
        let checkinTime = req.query.checkintime
        let checkoutTime = req.query.checkouttime
        //console.log(checkoutTime, checkinTime, req.query)
        let result = await Room.getIdleRoomByType(type, checkinTime, checkoutTime)
        result.success = true
        res.json(result)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            err,
        })
    }
}
