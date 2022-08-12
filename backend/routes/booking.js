import express from "express";
import Booking from "../models/Booking.js";
import {createBooking} from "../controllers/booking.js";
const router = express.Router();

//All da CRUD commands for database
//Download postman or insomnia whatever doesn't matter

//Create
router.post("/", createBooking);

export default router;