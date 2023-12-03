import express from "express";
import {registerController} from "../controllers/registerController.js";
import {validateUserCredentialsMiddleware} from "../middlewares/validateUserCredentialsMiddleware.js";
import {insertUserMiddleware} from "../middlewares/storageMiddleware.js";

const router = express.Router();

/*
 * POST: '/register'
 * fields (2):
 * + username: user01
 * + password: P@$$W0rd
 */
router.post('/', validateUserCredentialsMiddleware, insertUserMiddleware, registerController);

export default router;