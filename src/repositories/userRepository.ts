import UserModel from "../models/userModel";
import { IUser } from "../types";
class UserRepository{
    public async createUser(userData:IUser):Promise<IUser>{
        const user=new UserModel({
                        userName:userData.userName,
                        email:userData.email,
                        password:userData.password
                    });
                    await user.save();
                    return user;
    }
}
export default new UserRepository;