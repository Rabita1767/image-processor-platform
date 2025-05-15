import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import databaseConnection from "./config/database";
import userRoute from "./routes/userRoute";
dotenv.config();
export const startServer=()=>{
    const app=express();
    app.use(cors({ origin: "*" })); // Allow all origins (for testing purposes)
    app.use(express.json());
    app.use(express.urlencoded({extended:true})); 
    app.use("/api/v1/user",userRoute);

    const PORT=process.env.PORT ?? 8000;
    databaseConnection(()=>{
        app.listen(PORT,()=>{
            console.log(`Server is running on port ${PORT}`);
        }
        );
    })
}


