import { User } from "../models/user.model.js"
import bcryptjs from "bcryptjs"
import { generateTokenAndCookie } from "../utils/generateToken.js"

export async function signup(req,res) {
    try {
        const { email, password, username } = req.body

        if (!email || !password || !username) {
            return res.status(400).json({ success: false, message: "All fields are required"})
        }

        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/

        if (!emailRegex.test(email)) {
            return res.status(400).json({ success: false, message: "Invalid email" })
        }

        if (password.length < 6) {
            return res.status(400).json({ success: false, message: "Password must be atleast 6 characters"})
        }

        const existingUserByEmail = await User.findOne({ email: email})

        if (existingUserByEmail) {
            return res.status(400).json({success: false, message: "Email is already exists"})
        }

        const existingUserByUsername = await User.findOne({ username: username})

        if (existingUserByUsername) {
            return res.status(400).json({success: false, message: "Email is already exists"})
        }

        const  PROFILE_PICS = ["/avatar1.png", "/avatar2.png", "/avatar3.png"]

        const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)]

        const hashedPassword = await bcryptjs.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            image
        })

        generateTokenAndCookie(newUser._id, res)
        await newUser.save()

        res.status(201).json({ success: true, user: {
            ...newUser._doc,
            password:""
        } })

    } catch (error) {
        console.log("Error in signup controller", error.message)
        res.status(500).json({ success: false, message: "Internal server error"})
    }
}

export async function login(req,res) {
    res.send('Login route')
}

export async function logout(req,res) {
    res.send('Logout route')
}