const AccountController = require('../Controllers/AccountController')
const AuthMiddleWare = require('../Middlewares/Authenication')
const HouseController = require('../Controllers/HouseController')
const multer = require("multer");
const storage = multer.diskStorage({
  destination: "./Public/uploads/images",
  filename: function(req, file, cb){
     cb(null,"IMAGE-" + req.jwtDecoded.username + '-' + Date.now() + '-' + file.originalname);
  }
});

const upload = multer({
  storage: storage,
  limits:{fileSize: 10000000},
})
const LocationController = require('../Controllers/LocationController')
module.exports = function (app) {
  //cho phép cors từ React server
  app.use('/*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, content-type, X-Auth-Token, x-access-token');
    next();
  });
  //phương thức này để tránh lỗi khi react server gọi bản tin preflight check
  app.options('/*', function(req,res){
    res.status(200).end()
  })
  //Xử lý yêu cầu đăng nhập
  app.post('/login', AccountController.Login);
  // Xử lý yêu cầu đăng xuất
  app.post('/logout', AccountController.logOut)

  //xử lý yêu cầu làm mới JWT Token
  app.post("/refresh-token", AccountController.refreshToken);

  // Sử dụng authMiddleware.isAuth trước những api cần xác thực người dùng đã đăng nhập, thông tin người dùng có thể lấy trong req.jwtDecoded
  // app.use(AuthMiddleWare.isAuth);
}