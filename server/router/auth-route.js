const express = require("express");
const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")

const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  const { username, password } = req.body;
  if(!username && !password){
    return res.status(409).json({ message: "empty input field ! not allowed" });
  }

  const user = await userModel.findOne({ username });
  if (user) {
    return res.status(409).json({ message: "user existed,try another username" });
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const newuser = new userModel({ username, password: hashPassword });
  newuser.save();
  return res.json({ message: "data saved " });
});

userRouter.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await userModel.findOne({ username });
  console.log(user)
  if (!user) {
    return res.status(409).json({ message: "wrong credentials" });
  }
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(409).json({ message: "wrong credentials" });
  }
  
  const token = jwt.sign({id:user._id},"recipe")
  res.cookie("jwt", token, {
  httpOnly: true,      // JS থেকে পড়া যাবে না
  sameSite: "lax",    // cross-site request এ পাঠানো যাবে
  secure: false,       // dev এ false, prod এ true
  path: "/",           // default
  });

  return res.json({message:"successfully login",id:user._id , username:user.username})
});

userRouter.get("/logout",(req,res)=>{
  res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    path: "/",
  });
  res.json({message:"successfully clear cookies"})
})
module.exports = userRouter;
