import { Router } from "express";
import { accessTokenValidator } from "../middlewares/users.middleware.js";
import { createPostController, getPostDetailsController } from "../controllers/posts.controller.js";
const postRoute = Router();

postRoute.post("/", accessTokenValidator, createPostController);
postRoute.get("/:id", accessTokenValidator, getPostDetailsController);

export default postRoute;
