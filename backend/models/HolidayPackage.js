//Example data set
// {
//     "_id":{"$oid":"62fc35eb22ed8e8cacdd4f0a"},
//     "package":{"$numberInt":"1"},
//     "price":{"$numberDouble":"7197.54"},
//     "duration":{"$numberInt":"9"},
//     "destination":"Narowlya",
//     "img":"http://dummyimage.com/138x160.png/5fa2dd/ffffff",
//     "description":"Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem. Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo."
// }
// {
//     "_id":{"$oid":"63004b6f04826d5bb5fd80d2"},
//     "packageID":{"$numberInt":"1"},
//     "price":{"$numberDouble":"9615.58"},
//     "duration":{"$numberInt":"18"},
//     "destination":"France",
//     "description":"Ergonomic well-modulated definition",
//     "imgSource":"http://dummyimage.com/379x527.png/cc0000/ffffff"
// }
// {"_id":{"$oid":"62f0789cbe8608613abea38c"},"userName":"danielb","email":"danielbeiers@hotmail.com","password":"$2b$07$0x.Qri0kPB49GYIAw87dvuH0eS1AsqL/1eqMY1VCOWlvNm0EkfAgu","firstName":"daniel","lastName":"beiers","dob":{"$date":{"$numberLong":"1640563200000"}},"isAdmin":false,"__v":{"$numberInt":"0"}}

import mongoose from "mongoose";
// const {Schema} =mongoose;

const PackageSchema = new mongoose.Schema({

    packageID:{
        type: Number,
    },
    price:{
        type: Number,
    },
    duration:{
        type: Number,
    },
    destination:{
        type: String,
    },
    description:{
        type: String,
    },
    imgSource:{
        type: String,
    },
});

export default mongoose.model("HolidayPackage", PackageSchema, "HolidayPackages")