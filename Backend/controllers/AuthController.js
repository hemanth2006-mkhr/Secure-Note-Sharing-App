const UserModel = require("../models/UserModel")
const generateToken = require("../utils/generateToken")
const bcrypt = require("bcryptjs")


const registerUser = async(req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if all fields are provided
        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // Check if user already exists
        const existingUser = await UserModel.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already registered"
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await UserModel.create({
            username,
            email,
            password: hashedPassword
        });

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
}

const loginUser = async(req, res)=> {
    try {
        const { email, password } = req.body

        // Check if all fields are provided
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const user = await UserModel.findOne({
            email
        })
        if(!user){
            return res.status(401).json({
                success : false,
                message : "Incorrect email or password"
            })
        }
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if(!isPasswordValid){
            return res.status(401).json({
                success : false,
                message : "Incorrect email or password"
            })
        }
        return res.status(200).json({
            success : true,
            token : generateToken({ userId : user._id}),
            user : {
                id : user._id,
                username : user.username,
                email : user.email
            }
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}



module.exports = { registerUser, loginUser }