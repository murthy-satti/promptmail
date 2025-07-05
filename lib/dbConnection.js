import mongoose from "mongoose";

const Mongo_URL = process.env.MONGODB_URI

export const connectDB = async () => {
    if (mongoose.connection.readyState >=1) {
        return
    }
    return mongoose.connect(Mongo_URL)
}