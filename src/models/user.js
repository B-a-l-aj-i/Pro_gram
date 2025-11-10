import mongoose from "mongoose";
import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

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

userSchema.methods.getJwt = async function () {
  const user = this;

  const token = await jwt.sign(
    {
      userId: user.id,
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "24h" }
  );
  return token;
};

userSchema.methods.validatePassword=async function(password){
  const user= this
 
  const isPasswordValid=await bcrypt.compare(password, user.password);

  return isPasswordValid
}

const User = mongoose.model("User", userSchema);

export default User;
