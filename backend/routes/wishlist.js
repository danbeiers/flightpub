import express from "express";
import Wishlist from "../models/Wishlist.js";
import {createWishlist, deleteWishlist, getWishlist, getallWishlist} from "../controllers/wishlist.js";
const router = express.Router();

//All da CRUD commands for database


//Create
router.post("/", createWishlist);

//Delete
router.delete("/:id",  deleteWishlist);

//Get
//used to get a specific flight via unique id
//can be retrieved via idk anything also such as recommendation tag etc just change it in the path
router.get("/:id", getWishlist);

//Getall
router.get("/", getallWishlist)

export default router;