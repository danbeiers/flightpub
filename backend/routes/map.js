import express from "express";
import Flight from "../models/Map.js";
import {createMap, deleteMap, getallMap, getMap, updateMap} from "../controllers/map.js";
const router = express.Router();

//All da CRUD commands for database
//Download postman or insomnia whatever doesn't matter

//Create
router.post("/", createMap);

//Update
router.put("/:id", updateMap);

//Delete
router.delete("/:id",  deleteMap );

//Get
//used to get a specific flight via unique id
//can be retrieved via idk anything also such as recommendation tag etc just change it in the path
router.get("/:id", getMap);

//Getall
router.get("/", getallMap)

export default router;