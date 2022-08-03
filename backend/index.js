import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import req from "express/lib/request.js";
import res from "express/lib/response.js";
import session from "express-session";
import { default as connectMongoDBSession} from 'connect-mongodb-session';
import cors from "cors"

//import authRoute from "./routes/auth.js";
//import usersRoute from "./routes/users.js";
import airlinesRoute from "./routes/airline.js";
import flightRoute from "./routes/flight.js";
import loginRoute from "./routes/login.js"
import seat from "./routes/seat.js";
import flight from "./routes/flight.js";

const app = express()
dotenv.config()

const MAX_AGE = 1000 * 60 * 60 * 3 //Session cookie timeout
const MongoDBStore = connectMongoDBSession(session);
var mongoStore = new MongoDBStore({
    uri: process.env.MONGO,
    collection: 'Sessions',
})
const corsOptions = {
    origin: 'http://localhost:3000',
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
/*app.get('/',(req,res)=>{
    res.send("MongoDb API")
})*/

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
app.use(cors(corsOptions))
app.use(express.json());
//Session creation stuff
app.use(
    session({
        secret: 'randomkey1',
        name: 'session-id',
        store: mongoStore,
        cookie: {
            maxAge: MAX_AGE,
            sameSite: false,
            secure:false, //turn 'true' in deployment
        },
        resave: true,
        saveUninitialized: true

}))

//app.use("/auth", authRoute);
//app.use("/users", usersRoute);
app.use("/airline", airlinesRoute);
app.use("/flight", flightRoute);
app.use("/seat", seat);
app.use("/user", loginRoute);

//middleware for error handling
app.use((err,req,res, next)=>{
    return res.status(500).json("Hello error from handler")
})

app.listen(8800, ()=>{
    connect()
    console.log("Connected to backend!!! ")})
