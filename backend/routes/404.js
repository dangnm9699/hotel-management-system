module.exports = function (req, res) {
    res.status(404).send({
        url: req.originalUrl + ' not found'
    })
}