import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import session from "express-session";
import { default as connectMongoDBSession} from 'connect-mongodb-session';
import cors from "cors"

//import authRoute from "./routes/auth.js";
//import usersRoute from "./routes/users.js";
import airlinesRoute from "./routes/airline.js";
import flightRoute from "./routes/flight.js";
import loginRoute from "./routes/login.js"
import seat from "./routes/seat.js"
import packageRoute from './routes/holidayPackage.js'
import req from "express/lib/request.js";
import res from "express/lib/response.js";
import flight from "./routes/flight.js";
import mapRoute from "./routes/map.js";
import map from "./routes/map.js";
import bookingRoute from "./routes/booking.js";
import booking from "./routes/booking.js";
import wishlist from "./routes/wishlist.js";
import wishlistRoute from "./routes/wishlist.js";
import * as path from "path";



const app = express()
const port = process.env.PORT||8800

//const cors = require('cors');
//app.use(cors({ credentials: true, origin: true }));
dotenv.config()

const MAX_AGE = 1000 * 60 * 60 * 3 //Session cookie timeout
const MongoDBStore = connectMongoDBSession(session);
var mongoStore = new MongoDBStore({
    uri: process.env.MONGO,
    collection: 'Sessions',
})
const corsOptions = {
    origin: 'https://build-testing--tubular-bublanina-308c07.netlify.app/',
    optionsSuccessStatus: 200,
}


//FPUB-13 Adding login functionality

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
//app.use(cors)
app.use(cors(corsOptions))
app.use(express.json());
//Cors Configuration - Start
// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*")
//     res.header(
//         "Access-Control-Allow-Headers",
//         "Origin, X-Requested, Content-Type, Accept Authorization"
//     )
//     if (req.method === "OPTIONS") {
//         res.header(
//             "Access-Control-Allow-Methods",
//             "POST, PUT, PATCH, GET, DELETE"
//         )
//         return res.status(200).json({})
//     }
//     next()
// })
//Cors Configuration - End
//Session creation stuff
app.use(
    session({
        secret: 'randomkey1',
        name: 'session-id',
        store: mongoStore,
        cookie: {
            maxAge: MAX_AGE,
            sameSite: false,
            secure:true, //turn 'true' in deployment
        },
        resave: true,
        saveUninitialized: true

}))

//app.use("/auth", authRoute);
//app.use("/users", usersRoute);
app.use("/airline", airlinesRoute);
app.use("/flight", flightRoute);
app.use("/map", mapRoute);
app.use("/seat", seat);
app.use("/user", loginRoute);
app.use("/booking", bookingRoute);
app.use("/wishlist", wishlistRoute);
app.use("/holidayPackage",packageRoute);

//middleware for error handling
app.use((err,req,res, next)=>{
    return res.status(500).json("Hello error from handler")
})

app.listen(port, ()=>{
    connect()
    console.log("Connected to backend!!! ")})
