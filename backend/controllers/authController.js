const Account = require('../models/Account')
const config = require('../config/config')
const jwtHelper = require('../helpers/jwtToken')
const bcrypt = require('bcrypt')

let tokenList = {}

exports.login = async function (req, res) {
    // console.log('here')
    try {
        let user = await Account.getAccount(req.body.username)
        if (!user) {
            res.status(401).json({
                success: false,
                message: "Username or password incorrect"
            })
            return
        }
        let match = await bcrypt.compare(req.body.password, user.password)
        if (!match) {
            res.status(401).json({
                success: false,
                message: "Username or password incorrect"
            })
            return
        }
        const accessToken = await jwtHelper.generateToken(user, config.accessTokenSecret, config.accessTokenLife)
        const refreshToken = await jwtHelper.generateToken(user, config.refreshTokenSecret, config.refreshTokenLife)
        // console.log("tokenlife:", config.refreshTokenLife)
        tokenList[refreshToken] = { accessToken, refreshToken };
        res.cookie('refreshToken', refreshToken, { secure: false, httpOnly: true, maxAge: config.refreshTokenCookieLife });
        return res.status(200).json({
            success: true,
            accessToken,
        });
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            err,
        });
    }
}

exports.refreshToken = async (req, res) => {
    // User gửi mã refresh token kèm theo trong body
    const refreshTokenFromClient = req.cookies.refreshToken;
    // console.log('refreshToken: ', refreshTokenFromClient)
    // debug("tokenList: ", tokenList);

    // Nếu như tồn tại refreshToken truyền lên và nó cũng nằm trong tokenList của chúng ta
    if (refreshTokenFromClient && (tokenList[refreshTokenFromClient])) {
        try {
            // Verify kiểm tra tính hợp lệ của cái refreshToken và lấy dữ liệu giải mã decoded 
            const decoded = await jwtHelper.verifyToken(refreshTokenFromClient, config.refreshTokenSecret);
            // Thông tin user lúc này các bạn có thể lấy thông qua biến decoded.data
            // có thể mở comment dòng debug bên dưới để xem là rõ nhé.
            // debug("decoded: ", decoded);
            // console.log('decoded', decoded)
            const accessToken = await jwtHelper.generateToken(decoded, config.accessTokenSecret, config.accessTokenLife);
            // gửi token mới về cho người dùng
            return res.status(200).json({
                success: true,
                accessToken
            });
        } catch (error) {
            delete tokenList[refreshTokenFromClient];
            console.log(error);
            res.status(403).json({
                success: false,
                message: 'Invalid refresh token.',
            });
        }
    } else {
        // Không tìm thấy token trong request
        return res.status(403).send({
            success: false,
            message: 'No token provided.',
        });
    }
};

exports.logOut = function (req, res) {
    // console.log("cookies: ", req.cookies)
    var refreshToken = req.cookies.refreshToken;
    if (refreshToken) {
        delete tokenList[refreshToken];
        res.clearCookie('refreshToken');
    }
    res.status(200).json({
        success: true,
    });
}

exports.register = async function (req, res) {
    try {
        // console.log(config.saltRounds)
        // console.log(req.body.password)
        req.body.password = await bcrypt.hash(req.body.password, config.saltRounds)
        let id = await Account.createAccount(req.body)
        // console.log(req.body)
        // console.log(id)
        res.status(200).json({
            success: true,
            id: id,
        })
    } catch (err) {
        console.log(err)
        res.status(409).send({ success: false, error: err })
    }
}

exports.checkAuth = function (req, res) {
    res.json({
        success: true
    })
}

exports.getAccountList = async function(req, res){

}
exports.getAccount = async function (req, res) {
    try {
        let staff = await Account.getAccountById(req.params.id)
        if (!staff) {
            res.status(404).json({
                success: false,
                message: "Account not found"
            })
            return
        }
        res.json({
            success: true,
            data: staff,
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            err,
        })
    }
}


exports.getAccountList = async function (req, res) {
    try {
        let page = req.query.page || 1
        let perpage = req.query.perpage || 1000
        let result = await Account.getAccountList(page, perpage)
        result.success = true
        res.json(result)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            err,
        })
    }
}
exports.deleteAccount = async function (req, res) {
    try {
        let count = await Account.deleteAccount(req.params.id)
        if (count == 0) {
            res.status(404).json({
                success: false,
                message: "Account not found"
            })
            return
        }
        res.json({
            success: true,
            count
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            err,
        })
    }
}
exports.searchAccount= async function (req, res) {
    try {
        let key = req.query.key
        let page = req.query.page || 1
        let perpage = req.query.perpage || 1000
        let result = await Account.searchAccount(page, perpage, key)
        result.success = true
        res.json(result)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            err,
        })
    }
}
exports.searchUsername = async function (req, res) {
    try {
        let key = req.query.key
        let page = req.query.page || 1
        let perpage = req.query.perpage || 1000
        let result = await Account.searchUsername(page, perpage, key)
        result.success = true
        res.json(result)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            err,
        })
    }
}