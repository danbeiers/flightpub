//backend/controllers/booking.js

import req from "express/lib/request.js";
import res from "express/lib/response.js";
import Booking from "../models/Booking.js";
import Flight from "../models/Flight.js";


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

export const updateBooking = async (req, res)=>{
    try{

        //console.log(req);
        const updatedBooking= await Booking.findByIdAndUpdate(req.params.id, {$set: req.body},{new:true});
        res.status(200).json(updatedBooking);
    }catch(err){
        res.status(500).json(err);
    }}

export const getBooking = async (req, res)=>{
    try{

        // console.log(req);
        const booking= await Booking.findById(req.params.id);
        res.status(200).json(booking);
    }catch(err){
        res.status(500).json(err);
    }
}

export const getallBooking = async (req, res, next)=>{
    try{

        // console.log(req);
        const bookings= await Booking.find();
        res.status(200).json(bookings);
    }catch(err){
        next(err)
    }
}

export const deleteBooking = async (req, res)=>{
    try{

        // console.log(req);
        await Booking.findByIdAndDelete(req.params.id);
        res.status(200).json("Booking has been deleted");
    }catch(err){
        res.status(500).json(err);
    }
}
