import express from "express";
import imageController from "../controllers/imageController";
import authMiddleware from "../middlewares/authMiddleware";
import { upload } from "../config/multer";
const router=express.Router();
router.post("/upload",authMiddleware.auth,upload.single("image"),imageController.uploadImage);
export default router;