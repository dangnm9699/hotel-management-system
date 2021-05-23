const orderRouter = require('express').Router()
const authMiddleWare = require('../middlewares/authenication')
const orderControllers = require('../controllers/orderControllers')
const notFound = require('./404')


orderRouter.use(authMiddleWare.isAuth)
orderRouter.post('/', orderControllers.createOrder)
orderRouter.get('/arrival/day', orderControllers.getListOrderToCheckInByDay)
orderRouter.get('/arrival/tomorrow', orderControllers.getListOrderToCheckInByTomorrow)
orderRouter.get('/arrival/week', orderControllers.getListOrderToCheckInByWeek)
orderRouter.get('/departure/day', orderControllers.getListOrderToCheckOutByDay)
orderRouter.get('/departure/tomorrow', orderControllers.getListOrderToCheckOutByTomorrow)
orderRouter.get('/departure/week', orderControllers.getListOrderToCheckOutByWeek)
orderRouter.get('/inhouse', orderControllers.getListInHouse)
orderRouter.get('/revenue', orderControllers.getRevenue)

orderRouter.get('/arrival/:id', orderControllers.getOrder)
orderRouter.get('/checkin/:id', orderControllers.checkIn)
orderRouter.get('/checkout/:id', orderControllers.checkOut)
orderRouter.use(notFound);
module.exports = orderRouter