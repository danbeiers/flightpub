import req from "express/lib/request.js";
import res from "express/lib/response.js";
import Map from "../models/Map.js";


export const createMap = async (req, res)=>{

    const newMap = new Map(req.body);
    try{

        // console.log(req);
        const savedMap= await newMap.save()
        res.status(200).json(savedMap);
    }catch(err){
        res.status(500).json(err);
    }
}

export const updateMap = async (req, res)=>{
    try{

        //console.log(req);
        const updatedMap= await Map.findByIdAndUpdate(req.params.id, {$set: req.body},{new:true});
        res.status(200).json(updatedMap);
    }catch(err){
        res.status(500).json(err);
    }}

export const deleteMap = async (req, res)=>{
    try{

        // console.log(req);
        await Map.findByIdAndDelete(req.params.id);
        res.status(200).json("Map entry has been deleted");
    }catch(err){
        res.status(500).json(err);
    }
}

//get for getting specific cities based on tag
//http://localhost:8800/map?tag=Music and Arts
export const getMap = async (req, res, next) => {
    //   const {  ...others } = req.query;
    try {
        const map = await Map.find(req.query);
        res.status(200).json(map);
    }catch(err){
        res.status(500).json(err);
    }
}

//just trying something out with using a next function for error handling and declaring function
// in another js and calling it as opposed to using json
//ignore pls until i sort out the error handling xoxo

export const getallMap = async (req, res, next)=>{
    try{

        const maps = await Map.find();
        res.status(200).json(maps);
    }catch(err){
        next(err)
    }
}

