export const registerValidator = (req, res, next) => {
  const { email, password, confirm_password } = req.body;
  const regex =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
  // check email, password and confirm_password must be exist
  if (!(email && password && confirm_password)) {
    throw new Error("Your are missing fields");
  }
  // check email invalid
  if (!regex.test(email)) {
    throw new Error("Your email is invalid");
  }
  // check password and confirm_password must be matches
  if (password !== confirm_password) {
    throw new Error("Password and confirm_password must be matches");
  }
  next();
};
