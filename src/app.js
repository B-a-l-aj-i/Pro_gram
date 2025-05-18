import express from "express";
import { connectDB } from "./config/database.js";
import mongoose from "mongoose";
const app = express();

app.get("/", async (req, res) => {
  const result = await mongoose.connection.db
    .collection("user")
    .find()
    .toArray();

  console.log(result);
  res.send(result);
});

connectDB()
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => console.log(err));
