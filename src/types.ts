import { Document, Types } from 'mongoose';
export interface IUser extends Document{
    userName:string;
    email:string;
    password:string;
}

export interface IImage extends Document {
    user: Types.ObjectId;
    filename: string;
    originalPath: string;
    processedPath?: string;
    status: "pending" | "processing" | "done" | "failed";
  }