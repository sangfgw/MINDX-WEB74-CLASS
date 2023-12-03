import {getUserByName, insertUser} from "../utils/storage.js";
import {validatePassword, validateUserName} from "../utils/validate.js";

export const insertUserMiddleware = (req, res, next) => {
    const isUserNotExist = !getUserByName(req.body.username);

    if (req.isValidUserCredentials && isUserNotExist) {
        // Store Access Token Inside Application Storage
        insertUser({username: req.body.username, password: req.body.password});
    }

    req.isUserNotExist = isUserNotExist;

    next();
}