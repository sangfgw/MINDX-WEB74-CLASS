import express from 'express';
import {loginController} from "../controllers/loginController.js";
import {validateUserCredentialsMiddleware} from "../middlewares/validateUserCredentialsMiddleware.js";

const router = express.Router();

/*
 * POST: '/login'
 * fields (2):
 * + username: user01
 * + password: P@$$W0rd
 */
router.post('/', validateUserCredentialsMiddleware, loginController);

export default router;