import req from "express/lib/request.js";
import res from "express/lib/response.js";
import User from "../models/User.js";

export const register = async (req, res)=>{
    try{
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            residency: req.body.residency,
            age: req.body.age,
            gender: req.body.gender,
            favCity: req.body.favCity,
        })
        await newUser.save()
        res.status(200).send("User has been created")

    }catch(err)
    {
        res.status(500).json(err);
    }
}