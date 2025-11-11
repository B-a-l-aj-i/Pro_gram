import express from "express";
import User from "../models/user.js";
import { validateSignUp } from "../utils/validator.js";
import bcrypt from "bcrypt";

export const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  validateSignUp(req);
  try {
    const data = req.body;
    const { password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    data.password = hashedPassword;
    const user = new User({
      firstName: data.firstName,
      lastName: data.lastName,
      emailId: data.emailId,
      password: hashedPassword,
    });
    if (user) {
      const result = await user.save();
      res.send("sign up successful" + result);
    }
  } catch (err) {
    res.status(404).send(err.message + "account not created");
  }
});

authRouter.post("/login", async (req, res) => {
  const { emailId, password } = req.body;
  const user = await User.findOne({
    emailId,
  });

  if (!user) {
    res.sendStatus(404).send("user does not exist");
  }
  const passwordMatch = await user.validatePassword(password);
  if (passwordMatch) {
    const token = await user.getJwt();

    res.cookie("token", token, { maxAge: 24 * 60 * 60 * 1000 });

    res.status(200).send("logged in successfully");
  } else {
    res.status(404).send("incorrect password");
  }
});


authRouter.post("/logout",async (req,res)=>{
  res.clearCookie("token").status(200).send("logged out")
})