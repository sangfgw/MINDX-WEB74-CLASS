import {generateToken} from "../utils/jwtToken.js";

export const registerController = (req, res) => {
    const isValidRegisteredUser = req.isValidUserCredentials & req.isUserNotExist
    const objResponse = {
        message: "",
        status: 102,
    }

    objResponse.message = isValidRegisteredUser ? "Register Successfully" : "Register Failed";

    if (isValidRegisteredUser) {
        objResponse.token = generateToken({username: req.body.username, password: req.body.password});
    }

    objResponse.status = isValidRegisteredUser ? 201 : 400;


    res.json(objResponse);
}