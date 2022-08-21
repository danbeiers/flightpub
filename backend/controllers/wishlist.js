import req from "express/lib/request.js";
import res from "express/lib/response.js";
import Wishlist from "../models/Wishlist.js";


export const createWishlist = async (req, res)=>{

    const newWishlist = new Wishlist(req.body);
    try{

        // console.log(req);
        const savedWishlist= await newWishlist.save()
        res.status(200).json(savedWishlist);
    }catch(err){
        res.status(500).json(err);
    }
}

export const deleteWishlist = async (req, res)=>{
    try{

        // console.log(req);
        await Wishlist.findByIdAndDelete(req.params.id);
        res.status(200).json("Wishlist has been deleted");
    }catch(err){
        res.status(500).json(err);
    }
}

export const getWishlist = async (req, res)=>{
    try{

        // console.log(req);
        const wishlist= await Wishlist.findById(req.params.id);
        res.status(200).json(wishlist);
    }catch(err){
        res.status(500).json(err);
    }
}

//just trying something out with using a next function for error handling and declaring function
// in another js and calling it as opposed to using json
//ignore pls until i sort out the error handling xoxo

export const getallWishlist = async (req, res, next)=>{
    try{

        // console.log(req);
        const wishlists= await Wishlist.find();
        res.status(200).json(wishlists);
    }catch(err){
        next(err)
    }
}
