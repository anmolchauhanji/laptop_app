import express from "express";
import {register } from "../controllers/usercontrollers.js";

const router = express.Router();

router.post("/register", register);

export default router;