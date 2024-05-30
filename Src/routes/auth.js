import { Router } from "express";
import User from "../models/auth.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = Router();

//Sign up

router.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
    if (user) {
      return res.status(400).json({ message: "User already exists." });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: " User already exists" });
  }
});

//Sign in
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const userLogin = await User.findOne({ email });
    if (!userLogin) {
      return res.status(500).json({ message: "User Not Found" });
    }

    const passwordLogin = await bcrypt.compare(userLogin.password, password);
    if (!passwordLogin) {
      return res.status(500).json({ message: "Wrong credentials" });
        const token = await jwt.sign(userLogin, process.env.JWT_SECRET);
  res.status(200).json({ ...userLogin, accesToken: token });
    }
  } catch (error) {
    return res.status(500).json({ message: error });
  }

});

export { router };
