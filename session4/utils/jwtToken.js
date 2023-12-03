import jwt from "jsonwebtoken";
import {validateObj} from "./validate.js";

export const generateToken = (obj = {}) => {
    const isValidObj = validateObj(obj);
    const EXPIRED_TOKEN_MINUTES = 60 * 60; // 1 Hour
    let jwtToken = "";

    if (isValidObj) {
        jwtToken = jwt.sign(obj, process.env.PRIVATE_JWT_KEY, {expiresIn: EXPIRED_TOKEN_MINUTES});
    }

    return jwtToken;
}

export const verifyToken = (token = "") => {
    let isValidToken = false;

    if (token !== null && token !== "") {
        try {
            jwt.verify(token, process.env.PRIVATE_JWT_KEY)
            isValidToken = true;
        } catch (err) {
            console.log(err);
        }
    }

    return isValidToken;
}