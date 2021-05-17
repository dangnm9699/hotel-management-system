const Staff = require('../models/Staff')

exports.createStaff = async function (req, res) {
    try {
        let id = await Staff.createStaff(req.body)
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

exports.getStaff = async function (req, res) {
    try {
        let staff = await Staff.getStaff(req.params.id)
        if (!staff) {
            res.status(404).json({
                success: false,
                message: "Staff not found"
            })
            return
        }
        res.json({
            success: true,
            data: staff,
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            err,
        })
    }
}

exports.getStaffList = async function (req, res) {
    try {
        let page = req.query.page || 1
        let perpage = req.query.perpage || 1000
        let result = await Staff.getStaffList(page, perpage)
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

exports.updateStaff = async function (req, res) {
    try {
        let count = await Staff.updateStaff(req.params.id, req.body)
        if (count == 0) {
            res.status(404).json({
                success: false,
                message: "Staff not found"
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

exports.deleteStaff = async function (req, res) {
    try {
        let count = await Staff.deleteStaff(req.params.id)
        if (count == 0) {
            res.status(404).json({
                success: false,
                message: "Staff not found"
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
exports.searchStaff = async function (req, res) {
    try {
        let key = req.query.key
        let page = req.query.page || 1
        let perpage = req.query.perpage || 1000
        let result = await Staff.searchStaff(page, perpage, key)
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
exports.searchStaffName = async function (req, res) {
    try {
        let key = req.query.key
        let page = req.query.page || 1
        let perpage = req.query.perpage || 1000
        let result = await Staff.searchStaffName(page, perpage, key)
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