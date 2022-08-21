//backend/routes/booking.js

import express from "express";
import Booking from "../models/Booking.js";
import {createBooking, updateBooking, deleteBooking, getBooking, getallBooking} from "../controllers/booking.js";
import {deleteFlight} from "../controllers/flight.js";
const router = express.Router();

//All da CRUD commands for database
//Download postman or insomnia whatever doesn't matter

//Create
router.post("/", createBooking);

//Update
router.put("/:id", updateBooking );

//Get
router.get("/:id", getBooking);

//Delete
router.delete("/:id",  deleteBooking);

//Getall
router.get("/", getallBooking)

export default router;