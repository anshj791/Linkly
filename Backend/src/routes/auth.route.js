import express from 'express';
import {get_curruntuser, login , logout, register} from '../controller/auth.controller.js'
import { authMiddleware } from '../middleware/auth.middleware.js';


const router = express.Router()

router.post("/register", register)
router.post("/login" , login)
router.post("/logout",logout)
router.get("/me", authMiddleware, get_curruntuser)

export default router;