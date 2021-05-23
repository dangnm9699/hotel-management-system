const Order = require('../models/Order')

exports.createOrder = async function (req, res) {
    try {
        let id = await Order.createOrder(req.body)
        res.json({
            success: true,
            id
        })
    } catch (err) {
        console.log(err)
        if (typeof err === 'string' && err.startsWith('Phòng ')) {
            res.status(400).json({
                success: false,
                err,
            })
        } else {
            res.status(500).json({
                success: false,
                err,
            })
        }
    }
}
exports.getOrder = async function (req, res) {
    try {
        let data = await Order.createOrder(req.body)
        res.json({
            success: true,
            data: data,
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            err,
        })
    }
}
exports.getListOrderToCheckInByDay = async function (req, res) {
    try {
        let page = parseInt(req.query.page, 10) || 1
        let perpage = parseInt(req.query.perpage) || 1000
        let result = await Order.getListOrderToCheckInByDay(page, perpage)
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
exports.getListOrderToCheckInByTomorrow = async function (req, res) {
    try {
        let page = parseInt(req.query.page, 10) || 1
        let perpage = parseInt(req.query.perpage) || 1000
        let result = await Order.getListOrderToCheckInByTomorrow(page, perpage)
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
exports.getListOrderToCheckInByWeek = async function (req, res) {
    try {
        let page = parseInt(req.query.page, 10) || 1
        let perpage = parseInt(req.query.perpage) || 1000
        let result = await Order.getListOrderToCheckInByWeek(page, perpage)
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

exports.getOrder = async function (req, res) {
    try {
        let order = await Order.getOrder(req.params.id)
        if (!order) {
            res.status(404).json({
                success: false,
                message: "Room not found"
            })
            return
        }
        res.json({
            success: true,
            data: order,
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            err,
        })
    }
}

exports.checkIn = async function (req, res) {
    try {
        await Order.checkIn(req.params.id)
        res.json({
            success: true,
            data: req.params.id,
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            err,
        })
    }
}
exports.checkOut = async function (req, res) {
    try {
        await Order.checkOut(req.params.id)
        res.json({
            success: true,
            data: req.params.id,
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            err,
        })
    }
}
exports.getListOrderToCheckOutByDay = async function (req, res) {
    try {
        let page = parseInt(req.query.page, 10) || 1
        let perpage = parseInt(req.query.perpage) || 1000
        let result = await Order.getListOrderToCheckOutByDay(page, perpage)
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
exports.getListOrderToCheckOutByTomorrow = async function (req, res) {
    try {
        let page = parseInt(req.query.page, 10) || 1
        let perpage = parseInt(req.query.perpage) || 1000
        let result = await Order.getListOrderToCheckOutByTomorrow(page, perpage)
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
exports.getListOrderToCheckOutByWeek = async function (req, res) {
    try {
        let page = parseInt(req.query.page, 10) || 1
        let perpage = parseInt(req.query.perpage) || 1000
        let result = await Order.getListOrderToCheckOutByWeek(page, perpage)
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
exports.getListInHouse = async function (req, res) {
    try {
        let page = parseInt(req.query.page, 10) || 1
        let perpage = parseInt(req.query.perpage) || 1000
        let result = await Order.getListInHouse(page, perpage)
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
exports.getRevenue = async function (req, res) {
    try {
        let result = await Order.getRevenue();
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