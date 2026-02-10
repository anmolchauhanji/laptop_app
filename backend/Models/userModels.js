import mongoose from "mongoose";

const userschema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  profilepic: { type: String, default: "" },
  profilepicpublicID: { type: String, default: "" },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  token: { type: String, default: null },
  isVerified: { type: Boolean, default: false },
  isLoggedIN: { type: Boolean, default: false },
  otp: { type: String, default: null },
  otpExpiry: { type: Date, default: null },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zipcode: { type: String, required: true },
  phoneNo: { type: String, required: true },
},
  { timestamps: true });

export const User = mongoose.model("User", userschema);
