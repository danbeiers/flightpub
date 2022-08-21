//backend/models/Booking.js

import mongoose from "mongoose";
// const {Schema} =mongoose;

const BookingSchema = new mongoose.Schema({
    userID:{
        type: String,
        required: true,
    },
    bookingID:{
        type: String,
        required: true,
    },
    flight:{
        type: String,
        required: true,
    },
    seat:{
        type: String,
        required: true,
    },
    departure:{
        type: String,
        required: true,
    },
    bookingDate:{
        type: String,
        required: true,
    },
    departureDate:{
        type: String,
        required: true,
    },
    departureTime:{
        type: String,
        required: true,
    },
    destination:{
        type: String,
        required: true,
    },
    returnDate:{
        type: String,
        required: false,
    },
    returnTime:{
        type: String,
        required: false,
    },
    //
    cost:{
        type: String,
        required: false,
    },
});

export default mongoose.model("Booking", BookingSchema, "Bookings")