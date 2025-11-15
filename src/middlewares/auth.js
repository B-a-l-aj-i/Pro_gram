import jwt from "jsonwebtoken";
import User from "../models/user.js";
import dotenv from "dotenv";

// this is use to load the environment variables from the .env file
dotenv.config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

export const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      throw new Error("token not found");
    }

    const decoded = await jwt.verify(token, JWT_SECRET_KEY);

    if (!decoded) {
      throw new Error("ERROR in jwt key validation");
    }

    const user = await User.findById(decoded.userId);

    if (!user) {
      throw new Error("user does not exist");
    }

    req.user = user;
    next();
    return user;
  } catch (error) {
    console.log(error.message);

    res.status(404).send("error in user auth");
  }
};
