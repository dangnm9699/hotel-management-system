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
        let page = req.query.page || 1
        let perpage = req.query.perpage || 1000
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