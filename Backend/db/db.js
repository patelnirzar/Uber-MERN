import mongoose from "mongoose";
import { MONGODB_URI, DB_NAME } from "../constants-private.js"

const connectDB = async() => {
    await mongoose.connect(`${MONGODB_URI}/${DB_NAME}`)
    .then(() => {
        console.log('Connected to MongoDB');
    }).catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });
}

export default connectDB;

