import express from "express";
import { connectDB } from "./config/database.js";

import cookieParser from "cookie-parser";
import { authRouter } from "./router/auth.js";
import { profileRouter } from "./router/profile.js";

const app = express();


app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", profileRouter);

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

// app.get("/user", async (req, res) => {
//   const { emailId } = req.body;
//   const result = await User.findOne({
//     emailId,
//   });

//   res.send(result);
// });

// app.delete("/user", async (req, res) => {
//   console.log(req);
//   const { userId, emailId } = req.body;

//   if (userId) {
//     const result = await User.findOneAndDelete({ userId });
//     res.send(result);
//   }

//   const result = await User.findOneAndDelete({ emailId });

//   if (!result) {
//     res.send("user not found");
//   }

//   res.send(result);
// });

// app.patch("/user", async (req, res) => {
//   const { emailId, ...data } = req.body;

//   const ALLOWED_UPDATES = ["password", "age", "gender", "skills", "photoUrl"];
//   const isUpdateAllowed = Object.keys(data).every((el) => {
//     return ALLOWED_UPDATES.includes(el);
//   });

//   if (data.skills.length > 10) {
//     throw new Error("you can have only upto 10 skills");
//   }

//   if (!isUpdateAllowed) {
//     throw new Error("update  not allowed");
//   }
//   const result = await User.updateOne(
//     { emailId },
//     { $set: data },
//     { runValidators: true }
//   );
//   if (!result) {
//     res.send("error in updating");
//   }

//   res.send("updated successfully");
// });

// app.get("/cookies", (req, res) => {
//   console.log(req.cookies);
//   res.send(req.cookies);
// });

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
