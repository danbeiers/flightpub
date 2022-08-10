import mongoose from "mongoose";
// const {Schema} =mongoose;

const MapSchema = new mongoose.Schema({
    DestinationCode:{
        type: String,
        required: true,
    },
    City:{
        type:String,
        required: true,
    },
    Country:{
        type: String,
        required: true,
    },
    location:{
        type: Object,
        required: true,
    },
    visit:{
        type: String,
        required: true,
    },
    happening:{
        type: String,
        required: true,
    },
    tag:{
        type:String,
        required: true
    },
});

export default mongoose.model("Map", MapSchema, "Maps")