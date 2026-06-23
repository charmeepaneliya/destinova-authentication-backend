import mongoose from "mongoose";
import dotenv from "dotenv";
import HttpError from "../middleware/HttpError.js";

dotenv.config();

async function connectDB(){
    try {
        const connect = mongoose.connect(process.env.MONGO_URI);
        console.log("connect DB");
        return connect;
    } catch (error) {
        return next(new HttpError(error.message,500));
    }
};

export default connectDB;
