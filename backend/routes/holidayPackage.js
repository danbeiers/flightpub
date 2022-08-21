import express from "express";

import {createPackage, deletePackage, getAllPackages, getPackage, updatePackage} from "../controllers/package.js";
const router = express.Router();

//All da CRUD commands for database


//Create
router.post("/", createPackage);

//Update
router.put("/:id", updatePackage );

//Delete
router.delete("/:id",  deletePackage );

//Get
//used to get a specific flight via unique id
//can be retrieved via idk anything also such as recommendation tag etc just change it in the path
router.get("/:id", getPackage);

//Getall
router.get("/", getAllPackages)

export default router;