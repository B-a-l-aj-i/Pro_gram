import express from "express";

const app = express();

// app.get("/user/:id", (req, res) => {
//   console.log(req);
//   res.send(req.params);
// });

// app.use("/test", (req, res) => {
//   res.send("test successfull using app.use()");
// });

app.use(
  "/test",
  (req, res, next) => {
    console.log("Middleware function executed");
    next();
  },
  (req, res, next) => {
    console.log("Second middleware function executed");
    next();
  },
  (req, res, next) => {
    console.log("Third middleware function executed");
    res.send("test 3 successfull ");
  }
);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
