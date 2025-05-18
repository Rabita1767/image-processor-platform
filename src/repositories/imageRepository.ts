import ImageModel from "../models/imageModel";
import { IFile, IImage } from "../types";
class ImageRepository {
    public async uploadImage(userId:string | undefined,payload:IFile):Promise<IImage> {
        return await ImageModel.create({
            user:userId,
            filename:payload.filename,
            originalPath:payload.path
        })
    }

    public async findImageById(id:string):Promise<IImage | null>{
        return await ImageModel.findById({_id:id});
    }

}
export default new ImageRepository;