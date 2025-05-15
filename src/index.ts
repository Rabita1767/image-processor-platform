import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import databaseConnection from "./config/database";
dotenv.config();
export const startServer=()=>{
    const app=express();
    app.use(cors());
    app.use(express.json());
    const PORT=process.env.PORT ?? 3000;
    databaseConnection(()=>{
        app.listen(PORT,()=>{
            console.log(`Server is running on port ${PORT}`);
        }
        );
    })
}


