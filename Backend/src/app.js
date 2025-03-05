import express from "express";
import cors from "cors";
import getData from "./getData.js";
import getNews from "./getNews.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({
    origin: '*',
    methods: 'GET,POST',
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.get("/", (req,res) => {
    res.status(200).send("Hello World");
})

app.get("/getData", async (req,res) => {
    const {option} = req.query;
    console.log(option);
    try {
        const response = await getData(option);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ message: "Error fetching data", error: error.message });
    }
})

// app.get("/getNews", async (req,res) => {
//     try {
//         const response = await getNews();
//         res.status(200).json(response);
//     } catch (error) {
//         res.status(400).json({ message: "Error fetching news", error: error.message });
//     }
// })

export default app;