import { Router } from "express";
import {
  addStudent,
  getAllStudents,
  removeStudent,
  updateStudent,
} from "../controllers/student.controller.js";
const router = Router();

router
  .route("/")
  .get(getAllStudents)
  .post(addStudent)
  .delete(removeStudent)
  .patch(updateStudent);

export default router;
