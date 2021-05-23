const TimeKeepingRouter = require('express').Router()
const authMiddleWare = require('../middlewares/authenication')
const timeKeepingController = require('../controllers/timeKeepingController')
const notFound = require('./404')

TimeKeepingRouter.use(authMiddleWare.isAuth)
TimeKeepingRouter.post('/', timeKeepingController.createTimeKeeping)
TimeKeepingRouter.post('/list', timeKeepingController.getTimeKeepingList)
TimeKeepingRouter.delete('/:id', timeKeepingController.deleteTimeKeeping)
TimeKeepingRouter.use(notFound);
module.exports = TimeKeepingRouter