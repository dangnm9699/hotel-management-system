const roomRouter = require('express').Router()
const authMiddleWare = require('../middlewares/authenication')
const roomController = require('../controllers/roomController')
const notFound = require('./404')

//roomRouter.use(authMiddleWare.isAuth)
roomRouter.get('/', roomController.getRoomList)
roomRouter.get('/search', roomController.searchRoom)
roomRouter.get('/:id', roomController.getRoom)
roomRouter.post('/', roomController.createRoom)
roomRouter.put('/:id', roomController.updateRoom)
roomRouter.delete('/:id', roomController.deleteRoom)
roomRouter.use(notFound);
module.exports = roomRouter