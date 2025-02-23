import app from "./app.js";
import http from "http";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./connectDB.js";

const server = http.createServer(app);

connectDB()
.then(() => {
    server.listen(process.env.PORT, () => {
        console.log(`Example app listening on PORT ${process.env.PORT}`);
    });
})
.catch((error) => {
    console.log("Failed establishing connection with MongoDB", error);
})