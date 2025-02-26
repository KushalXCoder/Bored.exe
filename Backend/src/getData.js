import mongoose from "mongoose";

const getData = async (option) => {
    try {
        const collection = mongoose.connection.collection(`${option}`);
        const data = await collection.find({}).toArray();
        return data;  
    } catch (error) {
        console.log("Error finding data", error);
        return null;
    }
};

export default getData;