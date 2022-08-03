import express from "express";
import RegisteredUser from "../models/User.js";
import {loginUser, registerUser} from "../controllers/login.js";
const router = express.Router();

//Login router
router.post("/loginUser", loginUser);

//Registration router
router.post("/registerUser", registerUser);

export default router;