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

app.post("/signup", async (req, res) => {
  // const user = new User({
  //   firstName: "Mohn",
  //   lastName: "Doe",
  //   emailId: "mohn@doe.com",
  //   password: "password123",
  //   age: 30,
  //   gender: "male",
  // });

  // const result = await user.save();
  res.send(req.body);
});

connectDB()
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(8000, () => {
      console.log("Server is running on port 8000");
    });
  })
  .catch((err) => console.log(err));
