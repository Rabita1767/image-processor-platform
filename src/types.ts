import { Document, ObjectId, Types } from "mongoose";
import { Request } from "express";
export interface IUser extends Document {
  userName: string;
  email: string;
  password: string;
}

export interface IImage extends Document {
  user: Types.ObjectId;
  filename: string;
  originalPath: string;
  processedPath?: string;
  status: "pending" | "processing" | "done" | "failed";
}

export interface ApiResponse extends Document {
  success: boolean;
  data: any;
  message?: string;
  error?: any;
}

export interface IToken {
  accessToken: string;
  refreshToken: string;
}

export interface ITokenPayload {
  userId: string;
  userName: string;
  email: string;
}

export interface IloginPayload {
  email: string;
  password: string;
}
export interface ILoginResponse {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}

export interface CustomRequest extends Request {
  userId?: string;
}
