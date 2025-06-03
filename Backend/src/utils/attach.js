import { findUserbyId } from "../dao/user.dao.js";
import {verifyToken} from "./helper.js"

export const attachUser = async (req, res, next) => {

    const token = req.cookies.acseestoken;
    
    if (!token) return next();

    try {
        const decoded = verifyToken(token);
         const user = await findUserbyId(decoded.id)
         if (!user) return next();
         req.user = user;
         next();
    } catch (error) {
        console.log(error);
        next();
    }
    
}