import mongoose from "mongoose";
// const {Schema} =mongoose;

const FlightSchema = new mongoose.Schema({
    AirlineCode:{
        type: String,
        required: true,
    },
    FlightNumber:{
        type: String,
        required: true,
    },
    DepartureCode:{
        type: String,
        required: true,
    },
    StopoverCode:{
        type: String,
    },
    DestinationCode:{
        type: String,
        required: true,
    },
    PlaneCode:{
        type: String,
        required: true,
    },
    Duration:{
        type: Number,
        required: true,
    },


    /*flightId:{
        type: String,
        required: true,
    },
    departureCity:{
        type: String,
        required: true,
    },
    arrivalCity:{
        type: String,
        required: true,
    },
    cheapestPrice:{
        type: Number,
        required:true,
    },*/
});

export default mongoose.model("Flight", FlightSchema, "Flights")