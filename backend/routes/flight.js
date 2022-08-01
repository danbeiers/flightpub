import express from "express";
import Flight from "../models/Flight.js";
import {createFlight, deleteFlight, getallFlight, getFlight, updateFlight} from "../controllers/flight.js";
const router = express.Router();

//All da CRUD commands for database
//Download postman or insomnia whatever doesn't matter

//Create
router.post("/", createFlight);

//Update
router.put("/:id", updateFlight );

//Delete
router.delete("/:id",  deleteFlight );

//Get
//used to get a specific flight via unique id
//can be retrieved via idk anything also such as recommendation tag etc just change it in the path
router.get("/:id", getFlight);

//Getall
router.get("/", getallFlight)

export default router;