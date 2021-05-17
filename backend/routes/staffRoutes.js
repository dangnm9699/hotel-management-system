const staffRouter = require('express').Router()
const authMiddleWare = require('../middlewares/authenication')
const staffController = require('../controllers/staffController')
const notFound = require('./404')

staffRouter.use(authMiddleWare.isAuth)
staffRouter.get('/', staffController.getStaffList)
staffRouter.get('/search', staffController.searchStaff)
staffRouter.get('/searchname', staffController.searchStaffName)
staffRouter.get('/:id', staffController.getStaff)
staffRouter.post('/', staffController.createStaff)
staffRouter.put('/:id', staffController.updateStaff)
staffRouter.delete('/:id', staffController.deleteStaff)
staffRouter.use(notFound);
module.exports = staffRouter