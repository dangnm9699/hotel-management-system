const authRouter = require('./authRoutes')
const guestRouter = require('./guestRoutes')
const roomRouter = require('./roomRoutes')
const orderRouter = require('./orderRoutes')
const staffRouter = require('./staffRoutes')
const chamCongRouter = require('./timeKeepingRouters')
const notFound = require('./404')
const multer = require("multer");
const storage = multer.diskStorage({
  destination: "./public/uploads/images",
  filename: function (req, file, cb) {
    cb(null, "IMAGE-" + req.jwtDecoded.username + '-' + Date.now() + '-' + file.originalname);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10000000 },
})

module.exports = function (app) {
  app.use('/auth', authRouter)
  app.use('/guest', guestRouter)
  app.use('/room', roomRouter)
  app.use('/order', orderRouter)
  app.use('/staff', staffRouter)
  app.use('/timekeeping', chamCongRouter)
  app.use(notFound);
}