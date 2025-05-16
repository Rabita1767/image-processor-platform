import { Request, Response } from "express";
import { sendResponse } from "../utils/common";
import HTTP_STATUS from "../constants/statusCode";
import { Messages } from "../utils/messages";
import userService from "../services/userService";

class UserController {
  public async signup(req: Request, res: Response): Promise<void> {
    try {
      const signup = await userService.signup(req.body);
      return sendResponse(res, HTTP_STATUS.CREATED, Messages.CREATED, signup);
    } catch (error) {
      console.log(error);
      return sendResponse(
        res,
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        Messages.INTERNAL_SERVER_ERROR,
        error
      );
    }
  }

  public async login(req: Request, res: Response): Promise<void> {
    try {
      const login = await userService.login(req.body);
      return sendResponse(res, HTTP_STATUS.OK, Messages.CREATED, login);
    } catch (error) {
      console.log(error);
      return sendResponse(
        res,
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        Messages.INTERNAL_SERVER_ERROR,
        error
      );
    }
  }
}
export default new UserController();
