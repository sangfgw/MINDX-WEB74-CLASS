import {validatePassword, validateUserName} from "../utils/validate.js";

export const validateUserCredentialsMiddleware = (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    const isUserNameValid = username && validateUserName(username);
    const isPasswordValid = password && validatePassword(password);

    req.isValidUserCredentials = isUserNameValid && isPasswordValid;
    next();
}