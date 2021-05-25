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
        if (err && err.code === 'ER_DUP_ENTRY') {
            res.status(409).json({
                success: false,
                err,
            })
            return
        }
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

exports.searchByPhoneNumber = async function (req, res) {
    try {
        let page = req.query.page || 1
        let perpage = req.query.perpage || 1000
        let key = req.query.key
        let result = await Guest.searchGuestByPhoneNumber(page, perpage, key)
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
        if (err && err.code === 'ER_DUP_ENTRY') {
            res.status(409).json({
                success: false,
                err,
            })
            return
        }
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
exports.searchGuestName = async function (req, res) {
    try {
        let key = req.query.key
        let page = req.query.page || 1
        let perpage = req.query.perpage || 1000
        let result = await Guest.searchGuestName(page, perpage, key)
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
exports.searchGuest = async function (req, res) {
    try {
        let key = req.query.key
        let page = req.query.page || 1
        let perpage = req.query.perpage || 1000
        let result = await Guest.searchGuest(page, perpage, key)
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

exports.getGuestCountByRegion = async function (req, res) {
    try {
        let time = req.query.time;
        let result = await Guest.getGuestCountByRegion(time);
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