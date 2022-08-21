
import HolidayPackage from '../models/HolidayPackage.js'
import {params} from "svgo/plugins/convertPathData.js";
import PackageSchema from "../models/HolidayPackage.js";


export const createPackage = async (req, res)=>{

    const newPackage = new HolidayPackage(req.body);
    try{

        // console.log(req);
        const savedPackage= await newPackage.save()
        res.status(200).json(savedPackage);
    }catch(err){
        res.status(500).json(err);
    }
}

export const updatePackage = async (req, res)=>{
    try{

        //console.log(req);
        const updatedPackage= await PackageSchema.findByIdAndUpdate(req.params.id, {$set: req.body},{new:true});
        res.status(200).json(updatedPackage);
    }catch(err){
        res.status(500).json(err);
    }}

export const deletePackage = async (req, res)=>{
    try{

        // console.log(req);
        await HolidayPackage.findByIdAndDelete(req.params.id);
        res.status(200).json("Package has been deleted");
    }catch(err){
        res.status(500).json(err);
    }
}

export const getPackage = async (req, res)=>{
    try{
        console.log(req.params.id);
        //let id = parseInt(req.params.id)
        // console.log(req);
        const holidayPackage = await PackageSchema.findOne({packageID:req.params.id});

        if (!holidayPackage) {
            return res
                .status(400)
                .json({msg: 'Package not found'})
        }
        res.status(200).json(holidayPackage);

    }catch(err){
        res.status(500).json(err);
    }
}

//just trying something out with using a next function for error handling and declaring function
// in another js and calling it as opposed to using json
//ignore pls until i sort out the error handling xoxo

export const getAllPackages = async (req, res, next)=>{
    try{

        // console.log(req);
        const packages= await PackageSchema.find();
        res.status(200).json(packages);
    }catch(err){
        next(err)
    }
}
