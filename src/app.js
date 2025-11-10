import express from "express";
import { connectDB } from "./config/database.js";
import User from "./models/user.js";
import { validateSignUp } from "./utils/validator.js";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { userAuth } from "./middlewares/auth.js";

const app = express();
dotenv.config();

app.use(express.json());
app.use(cookieParser());

// this is use to load the environment variables from the .env file

app.post("/signup", async (req, res) => {
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

app.post("/login", async (req, res) => {
  const { emailId, password } = req.body;
  const user = await User.findOne({
    emailId,
  });

  if (!user) {
    res.sendStatus(404).send("user does not exist");
  }
  const passwordMatch = await user.validatePassword(password)
  if (passwordMatch) {
    const token = await user.getJwt()

    res.cookie("token", token, { maxAge: 24 * 60 * 60 * 1000 });

    res.status(200).send("logged in successfully");
  } else {
    res.status(404).send("incorrect password");
  }
});

app.get("/profile", userAuth, async (req, res) => {
  try {
    const { user } = req;

    res.status(200).send(user);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

app.get("/feed", userAuth, async (req, res) => {
  try {
    const result = await User.find();
    if (!result) {
      throw new Error("error in fetching feed");
    }
    res.send(result);
  } catch (error) {
    console.log("cannot fetching feed", error.message);
    res.status(400)("cannot fetching feed");
  }
});

app.get("/user", async (req, res) => {
  const { emailId } = req.body;
  const result = await User.findOne({
    emailId,
  });

  res.send(result);
});

app.delete("/user", async (req, res) => {
  console.log(req);
  const { userId, emailId } = req.body;

  if (userId) {
    const result = await User.findOneAndDelete({ userId });
    res.send(result);
  }

  const result = await User.findOneAndDelete({ emailId });

  if (!result) {
    res.send("user not found");
  }

  res.send(result);
});

app.patch("/user", async (req, res) => {
  const { emailId, ...data } = req.body;

  const ALLOWED_UPDATES = ["password", "age", "gender", "skills", "photoUrl"];
  const isUpdateAllowed = Object.keys(data).every((el) => {
    return ALLOWED_UPDATES.includes(el);
  });

  if (data.skills.length > 10) {
    throw new Error("you can have only upto 10 skills");
  }

  if (!isUpdateAllowed) {
    throw new Error("update  not allowed");
  }
  const result = await User.updateOne(
    { emailId },
    { $set: data },
    { runValidators: true }
  );
  if (!result) {
    res.send("error in updating");
  }

  res.send("updated successfully");
});

app.get("/cookies", (req, res) => {
  console.log(req.cookies);
  res.send(req.cookies);
});

// app.patch("/allpass", async (req, res) => {
//   const all = await User.find();

//   const result = await Promise.all(
//     all.map(async (user) => {
//       const hashedPassword = await bcrypt.hash(user.password, 10);
//       user.password = hashedPassword;
//       return user.save();
//     })
//   );
//   res.send(result);
// });

connectDB()
  .then(() => {
    console.log(
      "********************Connected to MongoDB*********************"
    );
    app.listen(8000, () => {
      console.log("Server is running on port 8000");
    });
  })
  .catch((err) => console.log(err));
