import { IloginPayload, ILoginResponse, IUser } from "../types";
import bcrypt from "bcrypt";
import userRepository from "../repositories/userRepository";
import { Messages } from "../utils/messages";
import { generateToken } from "../utils/common";

class UserService {
  public async signup(userData: IUser): Promise<IUser> {
    try {
      const { password } = userData;
      const hashedPassword = await bcrypt.hash(password, 10);
      if (!hashedPassword) {
        throw new Error("Password hashing failed");
      }
      userData.password = hashedPassword;
      const user = await userRepository.createUser(userData);
      if (!user) {
        throw new Error("User not created");
      }
      return user;
    } catch (error) {
      console.log(error);
      throw new Error("Error signing up user");
    }
  }

  public async login(payload: IloginPayload): Promise<ILoginResponse> {
    try {
      const findUser = await userRepository.findUserByEmail(payload.email);
      if (!findUser) {
        throw new Error(Messages.NOT_FOUND);
      }
      const isPasswordMatched = bcrypt.compare(
        findUser.password,
        payload.password
      );
      if (!isPasswordMatched) {
        throw new Error(Messages.INVALID_CREDENTIALS);
      }
      const { refreshToken, accessToken } = await generateToken(findUser);
      return {
        user: findUser,
        accessToken,
        refreshToken,
      };
    } catch (error) {
      console.log(error);
      throw new Error(Messages.ERROR_LOGGING_IN);
    }
  }
}
export default new UserService();
