import {verifyToken} from "../utils/jwtToken.js";

export const verifyJWTMiddleware = (req, res, next) => {
    const tokenAuthorization = req.headers.authorization?.split(' ')[1];
    const isVerifiedToken = verifyToken(tokenAuthorization);


    if (isVerifiedToken) {
        next();
    } else {
        return res.json({
            message: isVerifiedToken ? "Verify User Credentials Successfully" : "Unauthorized User",
            status: isVerifiedToken ? 200 : 401,
        });
    }
}