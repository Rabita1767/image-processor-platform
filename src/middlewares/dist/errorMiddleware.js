"use strict";
exports.__esModule = true;
exports.errorHandler = void 0;
var statusCode_1 = require("../constants/statusCode");
var common_1 = require("../utils/common");
exports.errorHandler = function (error, req, res, next) {
    var _a, _b;
    console.log(error);
    var statusCode = (_a = error.statusCode) !== null && _a !== void 0 ? _a : 500;
    var message = (_b = error.message) !== null && _b !== void 0 ? _b : statusCode_1["default"].INTERNAL_SERVER_ERROR;
    return common_1.sendResponse(res, statusCode, message);
};
