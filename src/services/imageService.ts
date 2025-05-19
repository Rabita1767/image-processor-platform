import { getRabbitChannel } from "../config/rabbitMq";
import imageRepository from "../repositories/imageRepository";
import {  IImage, IFile} from "../types";
import { Messages } from "../utils/messages";

 class ImageService {
    public async uploadImage(userId:string | undefined,payload:IFile | undefined):Promise<IImage>{
        try {

            if(!payload)
            {
                throw new Error(Messages.FILE_NOT_FOUND);
            }
            const uploadedImage=await imageRepository.uploadImage(userId,payload);
            if(!uploadedImage)
            {
                throw new Error(Messages.IMAGE_NOT_UPLOADED);
            }
            return uploadedImage;
        } catch (error) {
            console.log(error);
            throw new Error(Messages.ERROR_UPLOADING_IMAGE);
        }
    }

    public async compressImage(params: { id: string }): Promise<string | null> {
        try {
            const { id } = params;
            if(!id)
            {
                throw new Error(Messages.INVALID_PARAMETERS);
            }
            const findImageById = await imageRepository.findImageById(id);
            if (!findImageById) {
                throw new Error(Messages.IMAGE_NOT_FOUND);
            }
            const channel = await getRabbitChannel();
            channel.sendToQueue("compress", Buffer.from(JSON.stringify({
                imgId: id,
                path: findImageById.originalPath,
            })));
            console.log("Message sent to queue");
            return id;

        } catch (error) {
            console.log(error);
            throw new Error(Messages.ERROR_COMPRESSING_IMAGE);
        }
    }

    public async downloadProcessedImage(params:{id:string}):Promise<string>{
        try {
            const {id}=params;
            const findImageById=await imageRepository.findImageById(id);
            if(!findImageById)
            {
                throw new Error(Messages.IMAGE_NOT_FOUND);
            }
            const filePath=findImageById.processedPath;
            if(!filePath || findImageById.status!=="done")
            {
                throw new Error(Messages.IMAGE_NOT_COMPRESSED);
            }
            return filePath;     
        } catch (error) {
            console.log(error);
            throw new Error(Messages.ERROR_DOWNLOADING_IMAGE);
            
        }
    }

    public async getImageById(params:{id:string}):Promise<IImage | null>{
        try {
            const {id}=params;
            if(!id)
            {
                throw new Error(Messages.INVALID_PARAMETERS);
            }
            const findImageById=await imageRepository.findImageById(id);
            if(!findImageById)
            {
                throw new Error(Messages.IMAGE_NOT_FOUND);
            }
            return findImageById;      
        } catch (error) {
            console.log(error);
            throw new Error(Messages.IMAGE_NOT_FOUND);
            
        }
    }

}
export default new ImageService;