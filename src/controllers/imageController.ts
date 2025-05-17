import {Response} from "express";
import { sendResponse } from "../utils/common";
import HTTP_STATUS from "../constants/statusCode";
import { Messages } from "../utils/messages";
import imageService from "../services/imageService";
import { CustomRequest } from "../types";
class ImageController{

    public async uploadImage(req:CustomRequest,res:Response):Promise<void>
    {
        try {
            console.log("userId",req);
            const uploadImage=await imageService.uploadImage(req.userId,req.file);
            return sendResponse(res,HTTP_STATUS.CREATED,Messages.CREATED,uploadImage);
        } catch (error) {
            console.log(error);
            return sendResponse(res,HTTP_STATUS.INTERNAL_SERVER_ERROR,Messages.INTERNAL_SERVER_ERROR,error);
        }
    }

}
export default new ImageController;