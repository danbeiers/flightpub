import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import cors from "cors"
//import authRoute from "./routes/auth.js";
//import usersRoute from "./routes/users.js";
import airlinesRoute from "./routes/airline.js";
import flightRoute from "./routes/flight.js";
import seat from "./routes/seat.js";
import req from "express/lib/request.js";
import res from "express/lib/response.js";
import flight from "./routes/flight.js";
import mapRoute from "./routes/map.js";
import map from "./routes/map.js";
import bookingRoute from "./routes/booking.js";
import booking from "./routes/booking.js";
import wishlist from "./routes/wishlist.js";
import wishlistRoute from "./routes/wishlist.js";



const app = express()
app.use(cors({ credentials: true, origin: true }));
dotenv.config()
const connect = async () => {
try{
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDB")
} catch (error){
    throw error;
}};

//get request just to test the api
//can be removed later on
app.get('/',(req,res)=>{
    res.send("MongoDb API")
})

//technically this get request should allow the data stored in that specific table to be read
/*app.get('/api/airline',(req,res)=>{
    database.collection('Airlines').find({}).toArray()((err, result)=>{
        if(err) throw err
        res.send(result)

    })
})*/

//2 listeners to throw a msg at any point if connection is lost from db. Can be removed at later stage
//just done for idk good programming and easy to debug etc etc
mongoose.connection.on("disconnected", ()=>{
    console.log("mongodb disconnected at this fkin point")
})
mongoose.connection.on("connected", ()=>{
    console.log("mongodb connected!!!")
})

//middlewares
//middleware for insomnia/postman
app.use(express.json());

//app.use("/auth", authRoute);
//app.use("/users", usersRoute);
app.use("/airline", airlinesRoute);
app.use("/flight", flightRoute);
app.use("/map", mapRoute);
app.use("/seat", seat);
app.use("/booking", bookingRoute);
app.use("/wishlist", wishlistRoute);

//middleware for error handling
app.use((err,req,res, next)=>{
    return res.status(500).json("Hello error from handler")
})

app.listen(8800, ()=>{
    connect()
    console.log("Connected to backend!!! ")})
