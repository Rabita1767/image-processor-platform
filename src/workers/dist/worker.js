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
var amqplib_1 = require("amqplib");
var path_1 = require("path");
var sharp_1 = require("sharp");
var dotenv_1 = require("dotenv");
var database_1 = require("../config/database");
var imageRepository_1 = require("../repositories/imageRepository");
dotenv_1["default"].config();
var consumeQueue = function () { return __awaiter(void 0, void 0, void 0, function () {
    var connection, channel;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, amqplib_1["default"].connect(process.env.RABBITMQ_URL)];
            case 1:
                connection = _a.sent();
                return [4 /*yield*/, connection.createChannel()];
            case 2:
                channel = _a.sent();
                channel.assertQueue("compress");
                channel.consume("compress", function (msg) { return __awaiter(void 0, void 0, void 0, function () {
                    var _a, imgId, inputPath, ext, outputPath, updateImage, error_1;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                if (!msg) return [3 /*break*/, 5];
                                _a = JSON.parse(msg.content.toString()), imgId = _a.imgId, inputPath = _a.path;
                                ext = path_1["default"].extname(inputPath);
                                outputPath = inputPath.replace(ext, "compressed{ext}");
                                _b.label = 1;
                            case 1:
                                _b.trys.push([1, 4, , 5]);
                                return [4 /*yield*/, sharp_1["default"](inputPath).jpeg({ quality: 60 }).toFile(outputPath)];
                            case 2:
                                _b.sent();
                                return [4 /*yield*/, imageRepository_1["default"].findByIdAndUpdate(imgId, outputPath)];
                            case 3:
                                updateImage = _b.sent();
                                if (!updateImage) {
                                    throw new Error("Image not found");
                                }
                                channel.ack(msg);
                                return [3 /*break*/, 5];
                            case 4:
                                error_1 = _b.sent();
                                console.error("Error processing image:", error_1);
                                channel.nack(msg);
                                return [3 /*break*/, 5];
                            case 5: return [2 /*return*/];
                        }
                    });
                }); });
                console.log("Waiting for messages in the queue...");
                return [2 /*return*/];
        }
    });
}); };
database_1["default"](function () {
    console.log("Database connected");
    consumeQueue();
});
