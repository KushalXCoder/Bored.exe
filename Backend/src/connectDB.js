import mongoose from "mongoose";

const connectDB = async (req,res) => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`);
        console.log(`Successfully connected to ${connectionInstance.connection.host}`);
    } catch (error) {
        res.status(400).send("Error connecting with MongoDB");
        console.log(error);
    }
}

export default connectDB