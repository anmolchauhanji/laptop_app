import {User} from "../Models/userModels.js";


export const register = async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;
    if (!firstname || !lastname || !email || !password) {
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
    const newUser = await User.create({
      firstname,
      lastname,
        email,
        password,
    });
    await newUser.save();
    res.status(201).json({
      status: true,
      message: "User registered successfully",
      user: newUser,
    });
  } catch (error) {
    console.error("Error in register controller:", error);
    res.status(500).json({ status: false, message: error.message });
  }
};
