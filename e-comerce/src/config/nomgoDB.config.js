import mongoose from "mongoose";
import envsConfig from "./envs.config.js";

export const connectMongoDB = async () => {
    try {
        mongoose.connect(envsConfig.MONGO_URL);
        console.log(`Mongo connected in ${envsConfig.MONGO_URL}`);

    } catch (error) {
        console.log(error);

    }
}