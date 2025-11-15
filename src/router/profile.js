import express from "express";
import { userAuth } from "../middlewares/auth.js";
import User from "../models/user.js";

export const profileRouter = express.Router();

profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    const { user } = req;

    res.status(200).send(user);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

profileRouter.get("/feed", userAuth, async (req, res) => {
  try {
    const result = await User.find();
    if (!result) {
      throw new Error("error in fetching feed");
    }
    res.status(200).send(result);
  } catch (error) {
    console.log("cannot fetching feed", error.message);
    res.status(400)("cannot fetching feed");
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  const { user } = req;
  try {
    const { ...data } = req.body;

    const ALLOWED_UPDATES = [
      "password",
      "age",
      "gender",
      "skills",
      "photoUrl",
      "about",
    ];
    const isUpdateAllowed = Object.keys(data).every((el) => {
      return ALLOWED_UPDATES.includes(el);
    });

    if (data.skills && data.skills.length > 10) {
      console.warn("you can have only upto 10 skills");
      throw new Error("you can have only upto 10 skills");
    }

    if (!isUpdateAllowed) {
      console.warn("update not allowed");
      throw new Error("update not allowed", {
        cause: "trying to update that you should not update",
      });
    }
    const result = await user.updateOne(
      { $set: data },
      { runValidators: true }
    );

    if (!result) {
      res.status(400).send("error in updating");
    }
    res.status(200).send("updated successfully");
  } catch (error) {
    console.error("error in updating profile", error);
    res.status(400).send("error in updating profile");
  }
});
