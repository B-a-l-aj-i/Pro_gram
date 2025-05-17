import express from "express";

const app = express();

// app.use("/", (req, res, next) => {
//   console.log("Middleware for all routes");
//   res.send("Hello from the root route");
//   next();
// });

app.get("/test", (req, res, next) => {
  console.log("Middleware for /test route");
  // res.send("Hello from the /test  1 route");
  next();
});

app.get("/test", (req, res) => {
  res.send("Hello from /test route");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
