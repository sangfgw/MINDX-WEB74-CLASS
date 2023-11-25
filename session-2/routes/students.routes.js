import { Router } from "express";
import {
  createStudentController,
  deleteStudentByIdController,
  getStudentByIdController,
  getStudentsController,
  updateStudentByIdController,
} from "../controllers/students.controllers.js";

const studentRouter = Router();

// Create student
studentRouter.post("/", createStudentController);

/*
 * Get Students - GET
 * QUERY:
 *  - page=1 | 2 | 3 | 4...
 *  - name=John | J | j | JO | Jo |jo...
 *  - gender=male | female
 */
studentRouter.get("/", getStudentsController);

// Get student by id - Method: GET, data: {req.params}
studentRouter.get("/:id", getStudentByIdController);

// Update student by id - Method: PUT, data: {req.params, req.body}
studentRouter.put("/:id", updateStudentByIdController);

// Delete student by id - Method: DELETE, data: {req.params}
studentRouter.delete("/:id", deleteStudentByIdController);

export default studentRouter;
