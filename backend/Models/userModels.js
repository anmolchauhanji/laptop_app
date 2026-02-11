import mongoose from "mongoose";

const userschema = new mongoose.Schema({
    firstname:{type: String , required: true},
    lastname:{type: String , required: true},
    profilepic:{type: String , default: ""},
    profilepicpublicID:{type: String , default: ""},
    email:{type: String , required: true, unique: true},
    password:{type: String , required: true},
    phoneNo:{type: String , default: ""},
    address:{type: String , default: ""},
    city:{type: String , default: ""},
    state:{type: String , default: ""},
    zipcode:{type: String , default: ""},
    role:{
        type: String,
        enum:["user", "admin"],
        default:"user"
    } , 
    token:{type: String, default: null},
    isVerified:{type:Boolean, default:false},
    isLoggedIn:{type:Boolean, default:false},
    otp:{type:String, default:null},
    otpExpiry:{type:Date, default:null}
},
{timestamps:true})

export const User = mongoose.model("User", userschema);