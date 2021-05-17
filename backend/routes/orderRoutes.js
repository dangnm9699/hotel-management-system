const orderRouter = require('express').Router()
const authMiddleWare = require('../middlewares/authenication')
const orderControllers = require('../controllers/orderControllers')
const notFound = require('./404')


orderRouter.use(authMiddleWare.isAuth)
orderRouter.post('/', orderControllers.createOrder)
orderRouter.get('/arrival/day', orderControllers.getListOrderToCheckInByDay)
orderRouter.get('/arrival/tomorrow', orderControllers.getListOrderToCheckInByTomorrow)
orderRouter.get('/arrival/week', orderControllers.getListOrderToCheckInByWeek)
orderRouter.get('/arrival/:id', orderControllers.getOrder)
orderRouter.get('/checkin/:id', orderControllers.checkIn)
orderRouter.use(notFound);
module.exports = orderRouter