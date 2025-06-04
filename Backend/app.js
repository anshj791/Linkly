import express from "express";
const app = express();
import { nanoid } from "nanoid";
import dotenv from "dotenv";
import connectDB from "./src/config/mongoo.config.js";
import urlSchema from "./src/models/short_url.model.js";
import short_url from "./src/routes/short_url.route.js";
import userAuth from "./src/routes/auth.route.js";
import { redirectShorturl } from "./src/controller/short_url.controller.js";
import { errorHandler } from "./src/utils/errorHender.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { attachUser } from "./src/utils/attach.js";
dotenv.config("./.env");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(cors({
        origin: ["http://localhost:5173", "https://linkl.netlify.app"],
        credentials: true
}))
app.use(cookieParser()) 
app.use(attachUser)
app.use("/api/auth", userAuth)
app.use("/api/create", short_url)
app.get("/:id",redirectShorturl)

app.use(errorHandler)


app.listen(5000, ()=>{
        connectDB();
        console.log("Server is running on port 5000");
})