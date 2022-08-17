import mongoose from "mongoose";
// const {Schema} =mongoose;

const UserSchema = new mongoose.Schema({
    userName:{
        type: String,
        //required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    firstName:{
        type: String,
        //required: true,
    },
    lastName:{
        type: String,
        //required: true,
    },
    dob:{
        type: Date,
        //required: true,
    },
    bookedFlights:{
        type: JSON,
    },
    /*residency:{
        type: String,
    },
    age:{
        type: Number,
        //required: true
    },
    gender:{
        type: String,
        //required: true
    },
    favCity:{
        type: String
    },*/
    isAdmin:{
        type: Boolean,
        default: false
    },
});

export default mongoose.model('RegisteredUser', UserSchema,'RegisteredUsers')