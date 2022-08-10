import UserSchema from "../models/User.js";
import bcrypt from "bcrypt";
import express from "express";
import passwordRegexp from "password-regexp"

const router = express.Router()

export const registerUser = async (req, res)=>{
    const {email, password, repeatPassword, userName, firstName, lastName, dob} = req.body

    if (!email || !password || !userName)
        return res
            .status(400)
            .json({ msg: 'Password and email and UserName are required' })

    if (password.length < 8) {
        return res
            .status(400)
            .json({ msg: 'Password should be at least 8 characters long' })
    }
    if(!passwordRegexp(password)){
        return res
            .status(400)
            .json({ msg: 'Password needs atleast 1 Upper, 1 lower and 1 character ' })
    }
    if(!password === repeatPassword){
        return res
            .status(400)
            .json({ msg: 'Password needs to be the same ' })
    }

        const user = await UserSchema.findOne({email}) // finding user in db
        if (user) return res.status(400).json({msg: 'User already exists'})

        const newUser = new UserSchema({email, password, userName, firstName, lastName, dob})
        // hashing the password
        bcrypt.hash(password, 7, async (err, hash) => {
            if (err)
                return res.status(400).json({msg: 'error while saving the password'})

            newUser.password = hash
            const savedUserRes = await newUser.save()

            if (savedUserRes)
                return res.status(200).json({msg: 'user is successfully saved ok'})
        })
}

export const loginUser =  async (req, res) => {

    const {email, password} = req.body

    if (!email || !password) {
        return res
            .status(400)
            .json({msg: 'Something missing'})
    }

    const user = await UserSchema.findOne({email: email}) // finding user in db
    if (!user) {
        return res
            .status(400)
            .json({msg: 'User not found'})
    }

    // comparing the password with the saved hash-password
    const matchPassword = await bcrypt.compare(password, user.password)
    if (matchPassword) {
        const userSession = {email: user.email,userName:user.userName} //Create user session
        req.session.user = userSession
        return res
            .status(200)
            .json({msg: 'You have logged in successfully', userSession})
    } else {
        return res
            .status(400)
            .json({msg: 'Invalid credential'})
    }
}

export const isAuthorised = async (req, res) => {
    //console.log("User Authenticated:"+req.session.user)
    if (req.session.user) {
        //console.log("User Authenticated:"+req.session.user.userName)
        return res.json(req.session.user)
    } else {
        return res.status(401).json('unauthorized')
    }
}
export const logoutUser =  async (req, res) => {
    console.log('in logout')
    req.session.destroy((err) => {
        //delete session data from store, using sessionID in cookie
        if (err) throw err;
        res.clearCookie("session-id"); // clears cookie containing expired sessionID
        res.status(201).json("Logged out successfully");

    });
}

// comparing the password with the saved hash-password
