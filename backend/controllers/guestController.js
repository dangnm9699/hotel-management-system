const Guest = require('../models/Guest')

exports.createGuest = async function (req, res) {
    try {
        let id = await Guest.createGuest(req.body)
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

exports.getGuest = async function (req, res) {
    try {
        let guest = await Guest.getGuest(req.params.id)
        if (!guest) {
            res.status(404).json({
                success: false,
                message: "Guest not found"
            })
            return
        }
        res.json({
            success: true,
            data: guest,
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            err,
        })
    }
}

exports.getGuestList = async function (req, res) {
    try {
        let page = req.query.page || 1
        let perpage = req.query.perpage || 1000
        let result = await Guest.getGuestList(page, perpage)
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

exports.updateGuest = async function (req, res) {
    try {
        let count = await Guest.updateGuest(req.params.id, req.body)
        if (count == 0) {
            res.status(404).json({
                success: false,
                message: "Guest not found"
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

exports.deleteGuest = async function (req, res) {
    try {
        let count = await Guest.deleteGuest(req.params.id)
        if (count == 0) {
            res.status(404).json({
                success: false,
                message: "Guest not found"
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