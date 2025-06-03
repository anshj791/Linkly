import { nanoid } from "nanoid"
import jwt from 'jsonwebtoken';
import { cookieOption } from "../config/config.js";
import { configDotenv } from "dotenv";
configDotenv();


export const getnanoId = (length)=>{
    return nanoid(length)
}

export const signinToken = (payload) =>  {

 return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
}

export const verifyToken = (token) =>  {
    return jwt.verify(token, process.env.JWT_SECRET)
}
