import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import databaseConnection from "./config/database";
import userRoute from "./routes/userRoute";
import imageRoute from "./routes/imageRoute";
import { rabbitMqConnection } from "./config/rabbitMq";
import HTTP_STATUS from "./constants/statusCode";
import {errorHandler} from "./middlewares/errorMiddleware";

dotenv.config();
export const startServer=async ()=>{
    const app=express();
    app.use(cors({ origin: "*" })); // Allow all origins
    app.use(express.json());
    app.use(express.urlencoded({extended:true})); 
    app.use("/api/v1/user",userRoute);
    app.use("/api/v1/image",imageRoute);

    //Error Hnadling Middleware
    app.use(errorHandler);

    const PORT=process.env.PORT ?? 8000;
    try {
        await rabbitMqConnection();
        console.log("RabbitMQ connected");
        databaseConnection(()=>{
            app.listen(PORT,()=>{
                console.log(`Server is running on port ${PORT}`);
            }
            );
        })
        
    } catch (error) {
        console.error("Error starting teh server", error);
        process.exit(1);
    }
}


