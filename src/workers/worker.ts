import amqp from "amqplib";
import path from "path";
import sharp from "sharp";
import imageModel from "../models/imageModel";
import dotenv from "dotenv";
dotenv.config();
const consumeQueue=async()=>{
const connection=await amqp.connect(process.env.RABBITMQ_URL as string);
const channel=await connection.createChannel();
channel.assertQueue("compress");

channel.consume("compress",async(msg)=>{
    if(msg)
    {
        const {imgId,path:inputPath}=JSON.parse(msg.content.toString());
        console.log("Received message:", imgId, path);
        const ext=path.extname(inputPath);
        const outputPath=inputPath.replace(ext,`compressed{ext}`); 
        try {
            await sharp(inputPath).jpeg({quality:60}).toFile(outputPath);
            const updateImage=await imageModel.findByIdAndUpdate(imgId,{
                processedPath:outputPath,
                status:"done"
            },
            {new:true}
        )
        console.log("Image processed and saved:", updateImage);
            channel.ack(msg) 
        } catch (error) {
            console.error("Error processing image:", error);
            channel.nack(msg);
        }
    }
})
console.log("Waiting for messages in the queue...");

}
consumeQueue();