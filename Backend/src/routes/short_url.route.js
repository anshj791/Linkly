import express from "express";
import { createShorturl } from "../controller/short_url.controller.js";

const router = express.Router();

router.post("/",createShorturl)

export default router;