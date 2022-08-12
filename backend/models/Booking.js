import mongoose from "mongoose";
// const {Schema} =mongoose;

const BookingSchema = new mongoose.Schema({
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
});

export default mongoose.model("Booking", BookingSchema, "Bookings")