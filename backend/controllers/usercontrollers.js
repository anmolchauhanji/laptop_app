import {User} from "../Models/usermodels.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { VerifyEmail } from "../emailverify/verifyemail.js";
export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        status: false,
        message: "All fields are required",
      });
    }
    const user = await User.findOne({ email})
    if (user) {
        return res.status(400).json({
            status: false,
            message: "User already exists",
      });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);


    const newUser = await User.create({
      firstname: firstName,
      lastname: lastName,
        email,
        password: hashedPassword,
    });

    if (!process.env.SECRETKEY) {
      throw new Error("SECRETKEY not found in environment variables");
    }
    const token = jwt.sign({id: newUser._id }, process.env.SECRETKEY, {expiresIn:"10m"});
    VerifyEmail(token, email); //send email here
    newUser.token = token;

    res.status(201).json({
      status: true,
      message: "User registered successfully",
      user: newUser.toObject(),
    });
  } catch (error) {
    console.error("Error in register controller:", error);
    res.status(500).json({ status: false, message: error.message });
  }
}; 

export const verify = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if(!authHeader|| !authHeader.startsWith("Bearer ")){
      res.status(400).json({
         status: false,
         message: "authorized token is missing or invalid" }); 
    }
    const token = authHeader.split(" ")[1]
    let decoded 
    try {
      decoded = jwt.verify(token,process.env.SECRETKEY)
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return res.status(400).json({
          status: false,
          message: "registration Token expired"
        });
      }
      return res.status(400).json({
      status: false,
      message: "Token verification failed ",
    });
    
  }
  
  const user = await User.findById(decoded.id);
    if(!user){
      return res.status(404).json({
        status: false,
        message: "User not found"
      }); 
    }
    user.token = null;
    user.isVerified = true;
    await user.save();  
    return res.status(200).json({
      status: true,
      message: "Email verified successfully",
    });
  }
    
    catch(err){
    res.status(500).json({
      status: false,
      message: "Error verifying token",
      error: err.message
    });
  }
}

export const reVerify = async (req, res) => {
  try {
    const { email } = req.body; 
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ 
        status: false,
        message: "User not found" 
      });
    } 
    const token = jwt.sign({ id: user._id }, process.env.SECRETKEY, { expiresIn: "10m" });  
    VerifyEmail(token, email);
    user.token = token;
    await user.save();  
    return res.status(200).json({
      status: true,
      message: "Verification email resents successfully",
      token: token
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "Error resending verification email",
      error: err.message
    });
  } 
}