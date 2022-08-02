import req from "express/lib/request.js";
import res from "express/lib/response.js";
import Airline from "../models/Airline.js";



export const createAirline = async (req, res)=>{

    const newAirline = new Airline(req.body);
    try{

        // console.log(req);
        const savedAirline= await newAirline.save()
        res.status(200).json(savedAirline);
    }catch(err){
        res.status(500).json(err);
    }
}

export const updateAirline = async (req, res)=>{
try{

    //console.log(req);
    const updatedAirline= await Airline.findByIdAndUpdate(req.params.id, {$set: req.body},{new:true});
    res.status(200).json(updatedAirline);
}catch(err){
    res.status(500).json(err);
}}

export const deleteAirline = async (req, res)=>{
    try{

        // console.log(req);
        await Airline.findByIdAndDelete(req.params.id);
        res.status(200).json("Airline has been deleted");
    }catch(err){
        res.status(500).json(err);
    }
}

export const getAirline = async (req, res)=>{
    try{

        // console.log(req);
        const airline= await Airline.findById(req.params.id);
        res.status(200).json(airline);
    }catch(err){
        res.status(500).json(err);
    }
}

//just trying something out with using a next function for error handling and declaring function
// in another js and calling it as opposed to using json
//ignore pls until i sort out the error handling xoxo

export const getallAirline = async (req, res, next)=>{
    try{

        // console.log(req);
        const airlines = await Airline.find();
        res.status(200).json(airlines);
    }catch(err){
        next(err)
    }
}
