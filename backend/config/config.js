exports.accessTokenLife = process.env.ACCESS_TOKEN_LIFE || 30000;
exports.accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "ACCESS_TOKEN_SECRET";
exports.refreshTokenLife = process.env.REFRESH_TOKEN_LIFE || "30d";
exports.refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || "REFRESH_TOKEN_SECRET";
exports.refreshTokenCookieLife= 30*24*60*60*1000;