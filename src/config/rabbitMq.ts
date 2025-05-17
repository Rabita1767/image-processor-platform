import amqp from "amqplib";
import dotenv from "dotenv";
dotenv.config();

let channel:amqp.Channel;

export const rabbitMqConnection=async()=>{
    try {
        const connection=await amqp.connect(process.env.RABBITMQ_URL as string);
        channel=await connection.createChannel();
        await channel.assertQueue("compress");
        
    } catch (error) {
        console.error("Error connecting to RabbitMQ", error);
        throw new Error("RabbitMQ connection failed");
    }
   
}

export const getRabbitChannel=async()=>{
    if(!channel)
    {
        throw new Error("Channel not initialized");
    }
    return channel;
}