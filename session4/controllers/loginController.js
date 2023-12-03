import {validatePassword, validateUserName} from "../utils/validate.js";
import {generateToken} from "../utils/jwtToken.js";
import {getUserByName} from "../utils/storage.js";

export const loginController = (req, res) => {
    const user = getUserByName(req.body.username);
    const isValidRegisteredUser = user
        && req.isValidUserCredentials
        && req.body.username === user.username
        && req.body.password === user.password;


    const objResponse = {
        message: "",
        status: 102,
    }

    objResponse.message = isValidRegisteredUser ? "Login Successfully" : "Login Failed";

    if (isValidRegisteredUser) {
        objResponse.token = generateToken({username: req.body.username, password: req.body.password});
    }

    objResponse.status = isValidRegisteredUser ? 201 : 400;


    res.json(objResponse);
}