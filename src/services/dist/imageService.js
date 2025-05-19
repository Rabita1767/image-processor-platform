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
var rabbitMq_1 = require("../config/rabbitMq");
var imageRepository_1 = require("../repositories/imageRepository");
var messages_1 = require("../utils/messages");
var ImageService = /** @class */ (function () {
    function ImageService() {
    }
    ImageService.prototype.uploadImage = function (userId, payload) {
        return __awaiter(this, void 0, Promise, function () {
            var uploadedImage, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (!payload) {
                            throw new Error(messages_1.Messages.FILE_NOT_FOUND);
                        }
                        return [4 /*yield*/, imageRepository_1["default"].uploadImage(userId, payload)];
                    case 1:
                        uploadedImage = _a.sent();
                        if (!uploadedImage) {
                            throw new Error(messages_1.Messages.IMAGE_NOT_UPLOADED);
                        }
                        return [2 /*return*/, uploadedImage];
                    case 2:
                        error_1 = _a.sent();
                        console.log(error_1);
                        throw new Error(messages_1.Messages.ERROR_UPLOADING_IMAGE);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ImageService.prototype.compressImage = function (params) {
        return __awaiter(this, void 0, Promise, function () {
            var id, findImageById, channel, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        id = params.id;
                        if (!id) {
                            throw new Error(messages_1.Messages.INVALID_PARAMETERS);
                        }
                        return [4 /*yield*/, imageRepository_1["default"].findImageById(id)];
                    case 1:
                        findImageById = _a.sent();
                        if (!findImageById) {
                            throw new Error(messages_1.Messages.IMAGE_NOT_FOUND);
                        }
                        return [4 /*yield*/, rabbitMq_1.getRabbitChannel()];
                    case 2:
                        channel = _a.sent();
                        channel.sendToQueue("compress", Buffer.from(JSON.stringify({
                            imgId: id,
                            path: findImageById.originalPath
                        })));
                        console.log("Message sent to queue");
                        return [2 /*return*/, id];
                    case 3:
                        error_2 = _a.sent();
                        console.log(error_2);
                        throw new Error(messages_1.Messages.ERROR_COMPRESSING_IMAGE);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return ImageService;
}());
exports["default"] = new ImageService;
