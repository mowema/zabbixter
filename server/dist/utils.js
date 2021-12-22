"use strict";
exports.__esModule = true;
exports.getUserId = exports.APP_SECRET = void 0;
var jsonwebtoken_1 = require("jsonwebtoken");
exports.APP_SECRET = 'appsecret321';
function getUserId(context) {
    var authHeader = context.req.get('Authorization');
    if (authHeader) {
        var token = authHeader.replace('Bearer ', '');
        var verifiedToken = (0, jsonwebtoken_1.verify)(token, exports.APP_SECRET);
        return verifiedToken && Number(verifiedToken.userId);
    }
}
exports.getUserId = getUserId;
