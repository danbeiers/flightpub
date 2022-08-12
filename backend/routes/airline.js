import express from "express";
import Airline from "../models/Airline.js";
import {createAirline, deleteAirline, getallAirline, getAirline, updateAirline} from "../controllers/airline.js";
const router = express.Router();

//All da CRUD commands for database


//Create
router.post("/", createAirline);

//Update
router.put("/:id", updateAirline );

//Delete
router.delete("/:id",  deleteAirline );

//Get
//used to get a specific flight via unique id
//can be retrieved via idk anything also such as recommendation tag etc just change it in the path
router.get("/:id", getAirline);

//Getall
router.get("/", getallAirline)

export default router;