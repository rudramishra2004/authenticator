import uploadOnCloudinary from "../config/cloudinary.js"
import generateToken from "../config/token.js"
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"

//singup controller

export const signUp = async (req, res) => {
  try {
    // ✅ Log incoming request
    console.log("BODY:", req.body)
    console.log("FILE:", req.file)

    if (!req.body) {
      return res.status(400).json({ message: "No form data received" })
    }

    const { firstName, lastName, userName, email, password } = req.body

    if (!firstName || !lastName || !email || !password || !userName) {
      return res.status(400).json({ message: "Send all details" })
    }

    let profileImage;
    if(req.file){
        profileImage = await uploadOnCloudinary(req.file.path)
    }

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
      firstName,
      lastName,
      userName,
      email,
      password: hashedPassword,
      profileImage
    })

    const token = generateToken(user._id)

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })

    return res.status(201).json({
      user: { firstName, lastName, userName, email, profileImage },
    })
  } catch (error) {
    console.error("Signup Error:", error)
    return res.status(500).json({ message: "Internal Server Error" })
  }
}

//login controller
export const login = async(req,res)=>{
    try {
        const {email,password} = req.body

        if(!email || !password){
            return res.status(400).json({message:"input all details"})
        }

        const existUser = await User.findOne({email})
        if(!existUser){
            return res.status(400).json({message:"user not exist"})
        }

        const comparePassword = await bcrypt.compare(password,existUser.password)
        if(!comparePassword){
            return res.status(400).json({message:"incorrect password"})
        }

        const token = generateToken(existUser._id)

        res.cookie("token",token,{
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: 7*24*60*60*1000
        })

        return res.status(200).json({user:{
            firstName: existUser.firstName,
            lastName: existUser.lastName,
            email: existUser.email,
            userName: existUser.userName,
            profileImage:existUser.profileImage
        }})

    } catch (error) {
        return res.status(500).json({message:"internal server error"})
    }
}

//logout controller
export const logout = async(req,res)=>{
    try {
        res.clearCookie("token")
        return res.status(200).json({message:"logout successfully"})
    } catch (error) {
        return res.status(500).json(error)
    }
}

//get User data controller
export const getUserData = async(req,res)=>{
  try {
    let userId = req.userId
    if(!userId){
      return res.status(400).json({message:"user is not found"})
    }

    let user = await User.findById(userId)
    if(!user){
      return res.status(400).json({message:"user is not found"})
    }
    return res.status(200).json(user)

  } catch (error) {
    return res.status(500).json({message:error})
  }
}
