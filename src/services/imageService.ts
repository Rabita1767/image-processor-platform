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

}
export default new ImageService;