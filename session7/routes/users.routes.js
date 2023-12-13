import { Router } from "express";
import {
  getMeController,
  loginController,
  registerController,
} from "../controllers/users.controller.js";
import {
  accessTokenValidator,
  loginValidator,
  registerValidator,
} from "../middlewares/users.middleware.js";
const userRoute = Router();

userRoute.post("/register", registerValidator, registerController);
userRoute.post("/login", loginValidator, loginController);
userRoute.get("/me", accessTokenValidator, getMeController);

export default userRoute;
