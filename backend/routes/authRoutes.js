const authRouter = require('express').Router()
const authMiddleWare = require('../middlewares/authenication')
const authController = require('../controllers/authController')
const notFound = require('./404')

authRouter.post('/login', authController.login)
authRouter.post('/logout', authController.logOut)
authRouter.post('/refresh_token', authController.refreshToken)
authRouter.use(authMiddleWare.isAuth)
authRouter.get('/search', authController.searchAccount)
authRouter.get('/searchname', authController.searchUsername)
authRouter.get('/:id', authController.getAccount)
authRouter.delete('/:id', authController.deleteAccount)
authRouter.post('/register', authController.register)
authRouter.get('/', authController.getAccountList)
authRouter.get('/checkAuth', authController.checkAuth)
authRouter.put('/:id', authController.changePassword)
authRouter.use(notFound);
module.exports = authRouter