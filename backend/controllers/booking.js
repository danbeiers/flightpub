import req from "express/lib/request.js";
import res from "express/lib/response.js";
import Booking from "../models/Booking.js";



export const createBooking = async (req, res)=>{

    const newBooking = new Booking(req.body);
    try{

        // console.log(req);
        const savedBooking= await newBooking.save()
        res.status(200).json(savedBooking);
    }catch(err){
        res.status(500).json(err);
    }
}


