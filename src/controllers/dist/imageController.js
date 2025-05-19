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
var common_1 = require("../utils/common");
var statusCode_1 = require("../constants/statusCode");
var messages_1 = require("../utils/messages");
var imageService_1 = require("../services/imageService");
var ImageController = /** @class */ (function () {
    function ImageController() {
    }
    ImageController.prototype.uploadImage = function (req, res) {
        return __awaiter(this, void 0, Promise, function () {
            var uploadImage, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, imageService_1["default"].uploadImage(req.userId, req.file)];
                    case 1:
                        uploadImage = _a.sent();
                        return [2 /*return*/, common_1.sendResponse(res, statusCode_1["default"].CREATED, messages_1.Messages.CREATED, uploadImage)];
                    case 2:
                        error_1 = _a.sent();
                        console.log(error_1);
                        return [2 /*return*/, common_1.sendResponse(res, statusCode_1["default"].INTERNAL_SERVER_ERROR, messages_1.Messages.INTERNAL_SERVER_ERROR, error_1)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ImageController.prototype.compressImage = function (req, res) {
        return __awaiter(this, void 0, Promise, function () {
            var compressImage, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, imageService_1["default"].compressImage(req.params)];
                    case 1:
                        compressImage = _a.sent();
                        return [2 /*return*/, common_1.sendResponse(res, statusCode_1["default"].CREATED, messages_1.Messages.CREATED, compressImage)];
                    case 2:
                        error_2 = _a.sent();
                        console.log(error_2);
                        return [2 /*return*/, common_1.sendResponse(res, statusCode_1["default"].INTERNAL_SERVER_ERROR, messages_1.Messages.INTERNAL_SERVER_ERROR, error_2)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ImageController.prototype.downloadProcessedImage = function (req, res) {
        return __awaiter(this, void 0, Promise, function () {
            var downloadProcessedImagePath, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, imageService_1["default"].downloadProcessedImage(req.params)];
                    case 1:
                        downloadProcessedImagePath = _a.sent();
                        return [2 /*return*/, res.download(downloadProcessedImagePath)];
                    case 2:
                        error_3 = _a.sent();
                        console.log(error_3);
                        return [2 /*return*/, common_1.sendResponse(res, statusCode_1["default"].INTERNAL_SERVER_ERROR, messages_1.Messages.INTERNAL_SERVER_ERROR, error_3)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ImageController.prototype.getImageById = function (req, res) {
        return __awaiter(this, void 0, Promise, function () {
            var getImageById, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, imageService_1["default"].getImageById(req.params)];
                    case 1:
                        getImageById = _a.sent();
                        return [2 /*return*/, common_1.sendResponse(res, statusCode_1["default"].OK, messages_1.Messages.IMAGE_STATUS_FETCHED_SUCCESSFULLY, getImageById)];
                    case 2:
                        error_4 = _a.sent();
                        console.log(error_4);
                        return [2 /*return*/, common_1.sendResponse(res, statusCode_1["default"].INTERNAL_SERVER_ERROR, messages_1.Messages.INTERNAL_SERVER_ERROR, error_4)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return ImageController;
}());
exports["default"] = new ImageController;
