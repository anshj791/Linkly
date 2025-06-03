import { findUserbyId } from "../dao/user.dao.js"
import { verifyToken } from "../utils/helper.js"

export const authMiddleware = async (req, res, next) => {
    const token = req.cookies.acseestoken
    if(!token) return res.status(401).json({message:"Unauthorized 1"})
    try {
        const decoded = verifyToken(token)
        const user = await findUserbyId(decoded.id)
        if(!user) return res.status(401).json({message:"Unauthorized 2"})
        req.user = user
        next()
    } catch (error) {
        return res.status(401).json({message:"Unauthorized 3",error})
    }
}