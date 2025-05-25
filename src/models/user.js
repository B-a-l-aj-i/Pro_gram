import { response } from "express";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  emailId: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: /.+\@.+\..+/,
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
    lowercase: true,
    enum: {
      values: ["male", "female", "other"],
      message: "{VALUE} is not a valid gender",
    },
  },
});

const User = mongoose.model("User", userSchema);

export default User;
