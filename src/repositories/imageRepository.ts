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

}
export default new ImageRepository;