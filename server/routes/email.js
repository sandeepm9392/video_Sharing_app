import express from "express";
import { email } from "../controllers/email.js";

const router = express.Router();


router.post("/formsubmit", email)


export default router;