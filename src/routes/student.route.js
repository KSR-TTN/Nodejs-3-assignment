import { Router } from "express";
import {
  addStudent,
  getAllStudents,
  removeStudent,
  updateStudent,
  searchStudentsByName,
} from "../controllers/student.controller.js";
const router = Router();

router.route("/").get(getAllStudents).post(addStudent);
router.route("/:id").delete(removeStudent).patch(updateStudent);
router.route("/search").get(searchStudentsByName);

export default router;
