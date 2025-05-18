export const adminAuth = (req, res, next) => {
  if (req.headers.token == "asd") {
    next();
  } else {
    // res.status(401).send("Unauthorized");
    throw new Error("Unauthorized");
  }
};
