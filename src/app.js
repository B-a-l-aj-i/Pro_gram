import express from "express";
import { adminAuth } from "./middlewares/auth.js";

const app = express();

app.use("/admin", adminAuth);

app.get("/admin/all", (req, res) => {
  res.send("all data");
});

app.delete("/admin/user/1", (req, res) => {
  res.send("Deleted");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
