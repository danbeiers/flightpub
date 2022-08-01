import mongoose from "mongoose";
// const {Schema} =mongoose;

const AirlineSchema = new mongoose.Schema({
    AirlineCode:{
        type: String,
        required: true,
    },
    AirlineName:{
        type: String,
        required: true,
    },
    CountryCode3:{
        type: String,
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

export default mongoose.model("Airline", AirlineSchema)