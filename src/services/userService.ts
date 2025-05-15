import { IUser } from "../types";
import bcrypt from "bcrypt";
import userRepository from "../repositories/userRepository";

class UserService{

    public async signup(userData:IUser):Promise<IUser>{
        try{
            const { password } = userData;
            const hashedPassword=await bcrypt.hash(password,10);
            if(!hashedPassword){
                throw new Error("Password hashing failed");
            }
            userData.password = hashedPassword;
            const user=await userRepository.createUser(userData)
            if(!user){
                throw new Error("User not created");
            }
            return user;
        }
        catch(error){
            console.log(error);
            throw new Error("Error signing up user");
        }

    }

}
export default new UserService;