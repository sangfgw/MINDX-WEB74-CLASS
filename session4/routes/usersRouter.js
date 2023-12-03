import express from "express";
import {usersController} from "../controllers/usersController.js";
import {verifyJWTMiddleware} from "../middlewares/verifyJWTMiddleware.js";
const router = express.Router();

/*
 * GET: '/users'
 */
router.get('/', verifyJWTMiddleware, usersController);

export default router;