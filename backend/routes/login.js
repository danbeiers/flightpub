import express from "express";
import RegisteredUser from "../models/User.js";
import {loginUser, registerUser, isAuthorised, logoutUser} from "../controllers/login.js";
const router = express.Router();

//Login router
router.post("/loginUser", loginUser);

//Registration router
router.post("/registerUser", registerUser);

//Authorise the user path
router.get("/isAuth", isAuthorised);

//Logout of the current session
router.delete("/logoutUser", logoutUser);

export default router;