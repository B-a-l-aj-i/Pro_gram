import express from "express";
import { connectDB } from "./config/database.js";
import User from "./models/user.js";
import { validateSignUp } from "./utils/validator.js";
import bcrypt from "bcrypt";
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
  const { userId, emailId } = req.body;

  if (userId) {
    const result = await User.findOneAndDelete({ userId });
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

app.post("/signup", async (req, res) => {
  validateSignUp(req);
  const { password } = req.body;
  const hashedPassword = bcrypt.hash(password, 10, (err, hash) => {
    console.log(hash);
    res.send("hashedPassword :" + hash);
  });
  // const data = req.body;
  // const user = new User(data);
  // const result = await user.save();
  // res.send("sign up successful" + result);
});

app.patch("/allpass", async (req, res) => {
  const all = await User.find();

  const result = await Promise.all(
    all.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      user.password = hashedPassword;
      return user.save();
    })
  );
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
