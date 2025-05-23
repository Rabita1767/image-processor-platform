"use strict";
exports.__esModule = true;
var express_1 = require("express");
var imageController_1 = require("../controllers/imageController");
var authMiddleware_1 = require("../middlewares/authMiddleware");
var multer_1 = require("../config/multer");
var router = express_1["default"].Router();
router.post("/upload", authMiddleware_1["default"].auth, multer_1.upload.single("image"), imageController_1["default"].uploadImage);
router.post("/compress/:id", authMiddleware_1["default"].auth, imageController_1["default"].compressImage);
router.post("/download/:id", authMiddleware_1["default"].auth, imageController_1["default"].downloadProcessedImage);
router.get("/:id", authMiddleware_1["default"].auth, imageController_1["default"].getImageById);
exports["default"] = router;
