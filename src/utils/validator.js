import validator from "validator";

export const validateSignUp = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("invalid first or last name");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("invalid email");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("please enter strong password");
  }
};
