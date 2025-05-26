import { response } from "express";
import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  photoUrl: {
    type: String,
    default: "https://www.svgrepo.com/show/452030/avatar-default.svg",
    validate(value) {
      if (!validator.isURL(value)) {
        throw new Error();
      }
    },
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
  skills: {
    type: [String],
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
