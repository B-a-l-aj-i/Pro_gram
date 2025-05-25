import express from "express";
import { connectDB } from "./config/database.js";
import User from "./models/user.js";
const app = express();

app.use(express.json());

app.get("/feed", async (req, res) => {
  const result = await User.find();
  res.send(result);
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
  const { userId } = req.body;

  const result = await User.findByIdAndDelete({ _id: userId });

  if (!result) {
    res.send("user not found");
  }

  res.send(result);
});

app.patch("/user", async (req, res) => {
  const { emailId, ...data } = req.body;
  const result = await User.findOne({ emailId }).updateOne({
    ...data,
  });

  if (!result) {
    res.send("error in updating");
  }

  res.send("updated successfully");
});

app.post("/signup", async (req, res) => {
  const data = req.body;
  const user = new User(data);

  const result = await user.save();
  res.send(result);
});

connectDB()
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(8000, () => {
      console.log("Server is running on port 8000");
    });
  })
  .catch((err) => console.log(err));
