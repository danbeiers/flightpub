import req from "express/lib/request.js";
import res from "express/lib/response.js";
import Flight from "../models/Flight.js";
import FlightSchema from "../models/Flight.js";


export const createFlight = async (req, res)=>{

    const newFlight = new Flight(req.body);
    try{

        // console.log(req);
        const savedFlight= await newFlight.save()
        res.status(200).json(savedFlight);
    }catch(err){
        res.status(500).json(err);
    }
}

/*export const getFlightByDepDest = async (req, res)=>{

    try {

        const dep = req.params.dep;
        const dest = req.params.dest;


        console.log(dep);
        console.log(dest);

        if (dep == "") {
            return res.status(400).json({msg: 'Departure Location Missing'})
        }

        //if dest then get all relevant flights from dest to dep in specific time frame
        if (dest != "") {
            const flights = await FlightSchema.find({DepartureCode: "ADL", DestinationCode: "MEL"})
            console.log(flights);
            res.status(200).json(flights);
        }
        //else  get all relevant flights from dest in specific time frame
        else {
            const flights = await FlightSchema.find({DepartureCode: dep})
            res.status(200).json(flights);
        }
    }
    catch(err){
        res.status(500).json(err);
    }
}*/

export const updateFlight = async (req, res)=>{
    try{

        //console.log(req);
        const updatedFlight= await Flight.findByIdAndUpdate(req.params.id, {$set: req.body},{new:true});
        res.status(200).json(updatedFlight);
    }catch(err){
        res.status(500).json(err);
    }}

export const deleteFlight = async (req, res)=>{
    try{

        // console.log(req);
        await Flight.findByIdAndDelete(req.params.id);
        res.status(200).json("Flight has been deleted");
    }catch(err){
        res.status(500).json(err);
    }
}

export const getFlight = async (req, res)=>{
    try{

        // console.log(req);
        const flight= await Flight.findById(req.params.id);
        res.status(200).json(flight);
    }catch(err){
        res.status(500).json(err);
    }
}

//just trying something out with using a next function for error handling and declaring function
// in another js and calling it as opposed to using json
//ignore pls until i sort out the error handling xoxo

export const getAllFlight = async (req, res, next)=>{
    try{

        // console.log(req);
        const flights= await Flight.find();
        res.status(200).json(flights);
    }catch(err){
        next(err)
    }
}
