import express from "express";
import { adminAuth } from "./middlewares/auth.js";
import e from "express";

const app = express();

app.use("/admin", adminAuth);

app.get("/admin/all", (req, res) => {
  res.send("all data");
});

app.delete("/admin/user/1", (req, res) => {
  res.send("Deleted");
});

app.use("/", (err, req, res, next) => {
  res.status(500).send("Internal Server Error");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
