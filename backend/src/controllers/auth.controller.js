const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const blackListTokens = require("../models/blacklist.model");

async function registerUserController(req, res) {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const ifuserExists = await userModel.findOne({
    $or: [{ username }, { email }],
  });
  if (ifuserExists) {
    return res.status(400).json({ message: "User already exists" });
  }
  const hash = await bcrypt.hash(password, 10);
  const newUser = new userModel({
    username,
    email,
    password: hash,
  });
  const token = jwt.sign(
    { id: newUser._id, username: newUser.username },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );
  await newUser.save();
  res.cookie("token", token);
  res.status(201).json({
    message: "User registered successfully",
    newUser: {
      id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      token: token,
    },
  });
}

async function loginUserController(req, res) {
  const { email, password } = req.body;
  const eamilExists = await userModel.findOne({ email });
  if (!eamilExists) {
    return res.status(400).json({ message: "Invalid email or password" });
  }
  const ispasswordCorrect = await bcrypt.compare(
    password,
    eamilExists.password,
  );
  if (!ispasswordCorrect) {
    return res.status(400).json({ message: "Invalid email or password" });
  }
  const token = jwt.sign(
    { id: eamilExists._id, username: eamilExists.username },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );
  res.cookie("token", token);
  res.status(200).json({
    message: "User logged in successfully",
    user: {
      id: eamilExists._id,
      username: eamilExists.username,
      email: eamilExists.email,
      token: token,
    },
  });
}

async function logoutUserController(req, res) {
  const token = req.cookies.token;
  if (token) {
    await blackListTokens.create({ token });
  }
  res.clearCookie("token");
  res.status(200).json({
    message: "User logged out successfully",
  });
}
 
async function getUserController(req, res) {
   const user=await userModel.findById(req.user.id);
   if (!user) {
      return res.status(404).json({ message: "User not found" });
   }
   res.status(200).json({
      message:"User fetched successfully",
      user:{
         id:user._id,
         username:user.username,
         email:user.email
      }
   })
}  

module.exports = { registerUserController, loginUserController,
   logoutUserController,
   getUserController,
 };
