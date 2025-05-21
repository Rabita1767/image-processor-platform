"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var bcrypt_1 = require("bcrypt");
var userRepository_1 = require("../repositories/userRepository");
var messages_1 = require("../utils/messages");
var common_1 = require("../utils/common");
var AppError_1 = require("../utils/AppError");
var statusCode_1 = require("../constants/statusCode");
var UserService = /** @class */ (function () {
    function UserService() {
    }
    UserService.prototype.signup = function (userData) {
        return __awaiter(this, void 0, Promise, function () {
            var password, hashedPassword, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        password = userData.password;
                        return [4 /*yield*/, bcrypt_1["default"].hash(password, 10)];
                    case 1:
                        hashedPassword = _a.sent();
                        if (!hashedPassword) {
                            throw new AppError_1["default"](messages_1.Messages.BAD_REQUEST, statusCode_1["default"].BAD_REQUEST);
                        }
                        userData.password = hashedPassword;
                        return [4 /*yield*/, userRepository_1["default"].createUser(userData)];
                    case 2:
                        user = _a.sent();
                        if (!user) {
                            throw new AppError_1["default"](messages_1.Messages.USER_NOT_CREATED, statusCode_1["default"].BAD_REQUEST);
                        }
                        return [2 /*return*/, user];
                }
            });
        });
    };
    UserService.prototype.login = function (payload) {
        return __awaiter(this, void 0, Promise, function () {
            var findUser, isPasswordMatched, _a, refreshToken, accessToken;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, userRepository_1["default"].findUserByEmail(payload.email)];
                    case 1:
                        findUser = _b.sent();
                        if (!findUser) {
                            throw new AppError_1["default"](messages_1.Messages.NOT_FOUND, statusCode_1["default"].NOT_FOUND);
                        }
                        return [4 /*yield*/, bcrypt_1["default"].compare(payload.password, findUser.password)];
                    case 2:
                        isPasswordMatched = _b.sent();
                        if (!isPasswordMatched) {
                            throw new AppError_1["default"](messages_1.Messages.INVALID_CREDENTIALS, 401);
                        }
                        return [4 /*yield*/, common_1.generateToken(findUser)];
                    case 3:
                        _a = _b.sent(), refreshToken = _a.refreshToken, accessToken = _a.accessToken;
                        return [2 /*return*/, {
                                user: findUser,
                                accessToken: accessToken,
                                refreshToken: refreshToken
                            }];
                }
            });
        });
    };
    return UserService;
}());
exports["default"] = new UserService();
