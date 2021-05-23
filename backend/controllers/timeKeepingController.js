const TimeKeeping = require('../models/TimeKeeping')

exports.createTimeKeeping = async function (req, res) {
    try {
        let id = await TimeKeeping.addTimeKeeping(req.body)
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

exports.deleteTimeKeeping = async function (req, res) {
    try {
        let count = await TimeKeeping.deleteTimeKeeping(req.params.id)
        if (count == 0) {
            res.status(404).json({
                success: false,
                message: "Cham cong not found"
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

exports.getTimeKeepingList = async function (req, res) {
    try {
        let NVList = req.body.NVList
        let beginTime = new Date(req.body.beginTime)
        let endTime = new Date(req.body.endTime)
        //console.log(req.body)
        let result = {}
        result.data = await TimeKeeping.getTimeKeeping(NVList, beginTime, endTime)
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