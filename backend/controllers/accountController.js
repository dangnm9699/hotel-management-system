const Account = require('../Models/Account')
const config = require('../Config/config')
const jwtHelper = require('../Helpers/jwtToken')

let tokenList = {}

exports.Login = async function (req, res) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    try {
        var loginRes = await Account.logIn(req.body)
        if (loginRes.success === 1) {
            const user = await Account.getAccount(req.body.username)
            var userData = {
                userId: user.userId,
                username: user.username,
                acctype: user.acctype
            }
            const accessToken = await jwtHelper.generateToken(user, config.accessTokenSecret, config.accessTokenLife)
            const refreshToken = await jwtHelper.generateToken(user, config.refreshTokenSecret, config.refreshTokenLife)
            tokenList[refreshToken] = { accessToken, refreshToken };
            res.cookie('refreshToken', refreshToken, { secure: false, httpOnly: true, maxAge: config.refreshTokenCookieLife });
            return res.status(200).json({ accessToken });
        } else {
            res.status(403).send({ "message": 'Forbidden' })
        }
    } catch (err) {
        console.log(err)
        return res.status(500).json(err);
    }
}

exports.refreshToken = async (req, res) => {
    // User gửi mã refresh token kèm theo trong body
    const refreshTokenFromClient = req.cookies.refreshToken;
    // debug("tokenList: ", tokenList);

    // Nếu như tồn tại refreshToken truyền lên và nó cũng nằm trong tokenList của chúng ta
    if (refreshTokenFromClient && (tokenList[refreshTokenFromClient])) {
        try {
            // Verify kiểm tra tính hợp lệ của cái refreshToken và lấy dữ liệu giải mã decoded 
            const decoded = await jwtHelper.verifyToken(refreshTokenFromClient, refreshTokenSecret);
            // Thông tin user lúc này các bạn có thể lấy thông qua biến decoded.data
            // có thể mở comment dòng debug bên dưới để xem là rõ nhé.
            // debug("decoded: ", decoded);
            const userFakeData = decoded.data;
            debug(`Thực hiện tạo mã Token trong bước gọi refresh Token, [thời gian sống vẫn là 1 giờ.]`);
            const accessToken = await jwtHelper.generateToken(userFakeData, accessTokenSecret, accessTokenLife);
            // gửi token mới về cho người dùng
            return res.status(200).json({ accessToken });
        } catch (error) {
            delete tokenList[refreshTokenFromClient];
            res.status(403).json({
                message: 'Invalid refresh token.',
            });
        }
    } else {
        // Không tìm thấy token trong request
        return res.status(403).send({
            message: 'No token provided.',
        });
    }
};

exports.logOut = function (req,res) {
    // console.log("cookies: ", req.cookies)
    var refreshToken = req.cookies.refreshToken;
    if (refreshToken){
        delete tokenList[refreshToken];
        res.clearCookie('refreshToken');
    }
    res.status(200).send('');
}

exports.Register = function (req, res) {

    // console.log(req)

    // res.status(200).send({"Successed": true})
    Account.createAccount(req.body).then((result) => {
        if (result.ok === 1) {
            res.status(200).send({ "Successed": true })
        } else {
            res.status(409).send({ "Success": false, "error": result.error })
        }
    })
}