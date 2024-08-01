const User = require("../models/user-model");
const bcrypt = require("bcryptjs");

const home = async (req,res)=>{
    try {
        res.status(200).send("Welcome using router");
    } catch (error) {
        console.log(error);
    }
}

const register = async (req,res) => {
    try {
        const {username, email, phone, password} = req.body;

        const userExist = await User.findOne({email : email});
        if(userExist){
            return res.status(400).json({message : "Email already exists!"});
        }

        const userCreated = await User.create({username, email, phone, password});

        res.status(201).json({
            msg : "Registration Successful!", 
            token : await userCreated.generateToken(), 
            userId : userCreated._id.toString()
        });
    } catch (error) {
        // res.status(500).json({message : "Internal Server Error"});
        next(error);
    }
}

const login = async (req,res) => {
    try {
        const {email, password} = req.body;

        const userExist = await User.findOne({email : email});
        if(!userExist){
            return res.status(400).json({message: "Invalid Credentials!"});
        }

        // const user = await bcrypt.compare(password, userExist.password);
        const user = await userExist.comparePassword(password);
        if(user){
            res.status(200).json({
                msg : "Login Successful!", 
                token : await userExist.generateToken(), 
                userId : userExist._id.toString()
            });
        }else{
            res.status(401).json({message: "Invalid Email or Password!"});
        }
    } catch (error) {
        res.status(500).json({message : "Internal server error!"});
    }
}

const user = async (req,res) => {
    try {
        const userData = req.user;
        console.log(userData);
        res.status(200).json({userData});
    } catch (error) {
        console.log("Error from the user route ${error}");
    }
}

module.exports = {home, register, login, user};