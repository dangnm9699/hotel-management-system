const jwt = require('jsonwebtoken');

/**
 * private function generateToken
 * @param user 
 * @param secretSignature 
 * @param tokenLife 
 */
exports.generateToken = function (user, secretSignature, tokenLife) {
  return new Promise((resolve, reject) => {
    // Định nghĩa những thông tin của user mà bạn muốn lưu vào token ở đây
    const userData = {
      username: user.username,
      acctype: user.acctype,
    }
    // Thực hiện ký và tạo token
    jwt.sign(
      userData,
      secretSignature,
      {
        algorithm: "HS256",
        expiresIn: tokenLife,
      },
      (error, token) => {
        if (error) {
          return reject(error);
        }
        resolve(token);
      });
  });
}

/**
 * This module used for verify jwt token
 * @param {*} token 
 * @param {*} secretKey 
 */
exports.verifyToken = (token, secretKey) => {
  //console.log('verifytoken: ', token)
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretKey, (error, decoded) => {
      if (error) {
        return reject(error);
      }
      resolve(decoded);
    });
  });
}