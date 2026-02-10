import mongoose from "mongoose";

const userschema = new mongoose.Schema({
    firstname:{type: String , required: true},
    lastname:{type: String , required: true},
    profilepic:{type: String , default: ""},
    profilepicpublicID:{type: String , default: ""},
    email:{type: String , required: true,unique :true},
    password:{type: String , required: true},
    role:{
        type: String,
        enum:[
            "user",
            "admin"
        ],
        default:"user"
    }
})

