import express from "express";
import { connectDB } from "./config/database.js";
import mongoose from "mongoose";
import User from "./models/user.js";
const app = express();

app.get("/all", async (req, res) => {
  const result = await mongoose.connection.db
    .collection("user")
    .find()
    .toArray();

  console.log(result);
  res.send(result);
});

app.post("/signup", async (req, res) => {
  const user = new User({
    firstName: "Mohn",
    lastName: "Doe",
    emailId: "mohn@doe.com",
    password: "password123",
    age: 30,
    gender: "male",
  });

  const result = await user.save();
  res.send("User created");
});

app.post("/signin");

app.post("/logout");

connectDB()
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => console.log(err));
